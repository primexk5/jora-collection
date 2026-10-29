import { mkdir, readFile, writeFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { PRODUCTS, getDescription } from '../src/data/products.js'
import { SITE, formatNaira } from '../src/lib/site.js'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const template = await readFile(join(dist, 'index.html'), 'utf8')
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
await mkdir(join(dist, 'product'), { recursive: true })

for (const product of PRODUCTS) {
  const url = new URL(`/product/${product.id}`, SITE.url).href
  const imagePath = `og/${product.id}.jpg`
  const image = new URL(`/${imagePath}`, SITE.url).href
  const description = `${formatNaira(product.price)} — ${getDescription(product)}`
  if ((await stat(join(dist, imagePath))).size >= 300000) throw new Error(`Preview image too large: ${imagePath}`)
  const meta = [
    ['og:title', product.name],
    ['og:description', description],
    ['og:image', image],
    ['og:image:secure_url', image],
    ['og:image:type', 'image/jpeg'],
    ['og:image:width', '800'],
    ['og:image:height', '800'],
    ['og:image:alt', product.name],
    ['og:url', url],
    ['og:type', 'product'],
    ['og:site_name', SITE.name],
  ].map(([property, content]) => `    <meta property="${property}" content="${escape(content)}" />`).join('\n')
  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escape(product.name)} — JORA Collection</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/s, `<meta name="description" content="${escape(description)}" />`)
    .replace('</head>', `${meta}\n    <link rel="canonical" href="${escape(url)}" />\n  </head>`)
  await writeFile(join(dist, 'product', `${product.id}.html`), html)
}
console.log(`Generated ${PRODUCTS.length} product pages with static Open Graph metadata.`)
