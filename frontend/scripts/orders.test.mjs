import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { CATEGORIES, PRODUCTS, defaultSize, getColor, priceFor } from '../src/data/products.js'
import { cartMessage, productPageUrl, singleItemMessage } from '../src/lib/cart.js'
import { formatNaira, waLink } from '../src/lib/site.js'
import { routeFromLocation } from '../src/lib/routes.js'

const dist = new URL('../dist/', import.meta.url)
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

test('every product produces a complete order and a direct JORA WhatsApp link', () => {
  for (const product of PRODUCTS) {
    const size = defaultSize(product)
    const message = singleItemMessage(product, product.palette, size.label, 2)
    const lines = message.split('\n')
    assert.ok(message.includes(product.name))
    assert.ok(lines.includes(`Colour: ${getColor(product, product.palette).name}`))
    assert.ok(lines.includes(`Style: ${CATEGORIES.find((entry) => entry.id === product.category).label}`))
    assert.ok(lines.includes('Quantity: 2'))
    assert.ok(lines.includes(`Unit price: ${formatNaira(priceFor(product, size.label))}`))
    assert.ok(lines.includes(`*Subtotal: ${formatNaira(priceFor(product, size.label) * 2)}*`))
    assert.ok(lines.includes(`https://jora-collection.vercel.app/product/${product.id}`))
    const link = waLink(message)
    assert.equal(link, `https://wa.me/2347063374333?text=${encodeURIComponent(message)}`)
    assert.equal(new URL(link).searchParams.get('text'), message)
  }
})

test('multi-item order keeps each URL on its own line and calculates subtotal', () => {
  const items = PRODUCTS.slice(0, 3).map((product, index) => ({ productId: product.id, color: product.palette, size: defaultSize(product).label, quantity: index + 1 }))
  const message = cartMessage(items)
  const urls = message.split('\n').filter((line) => line.startsWith('https://'))
  assert.deepEqual(urls, PRODUCTS.slice(0, 3).map((product) => productPageUrl(product.id)))
  const subtotal = items.reduce((sum, item, index) => sum + priceFor(PRODUCTS[index], item.size) * item.quantity, 0)
  assert.ok(message.includes(`*Subtotal: ${formatNaira(subtotal)}*`))
  assert.ok(message.includes('Total items: 6'))
})

test('stable product URLs open the right bag; old hash URLs and normal tabs still work', () => {
  for (const product of PRODUCTS) {
    for (const pathname of [`/product/${product.id}`, `/product/${product.id}/`]) {
      assert.equal(routeFromLocation({ pathname, hash: '' }).product?.id, product.id)
    }
    assert.equal(routeFromLocation({ pathname: '/', hash: `#bag/${product.id}` }).product?.id, product.id)
  }
  for (const page of ['home', 'shop', 'new-arrivals', 'lookbook', 'contact']) {
    assert.deepEqual(routeFromLocation({ pathname: '/', hash: `#${page}` }), { page, product: null })
  }
  assert.equal(routeFromLocation({ pathname: '/product/%invalid', hash: '' }).page, 'home')
})

test('every built product HTML has the correct preview tags in its head without JavaScript', async () => {
  for (const product of PRODUCTS) {
    const html = await readFile(new URL(`product/${product.id}.html`, dist), 'utf8')
    const head = html.slice(html.indexOf('<head>'), html.indexOf('</head>'))
    assert.ok(head.includes(`<meta property="og:title" content="${escape(product.name)}"`))
    assert.match(head, /property="og:description" content="₦[^"]+"/)
    assert.ok(head.includes(`<meta property="og:url" content="${productPageUrl(product.id)}"`))
    assert.ok(head.includes('<meta property="og:type" content="product"'))
    assert.ok(head.includes(`<meta property="og:image" content="https://jora-collection.vercel.app/og/${product.id}.jpg"`))
    assert.ok(head.includes('property="og:image:width" content="800"'))
    assert.ok(head.includes('property="og:image:height" content="800"'))
    const image = await readFile(new URL(`og/${product.id}.jpg`, dist))
    assert.ok(image.length < 300000, `${product.id}: image under 300 KB`)
    assert.equal(image.readUInt16BE(0), 0xffd8)
    let offset = 2
    let dimensions
    while (offset < image.length) {
      assert.equal(image[offset], 0xff)
      const marker = image[offset + 1]
      const length = image.readUInt16BE(offset + 2)
      if ([0xc0, 0xc1, 0xc2].includes(marker)) {
        dimensions = { height: image.readUInt16BE(offset + 5), width: image.readUInt16BE(offset + 7) }
        break
      }
      offset += 2 + length
    }
    assert.deepEqual(dimensions, { width: 800, height: 800 })
  }
})
