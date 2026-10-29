import { CATEGORIES, getColor, getProduct, getSize, priceFor } from '../data/products.js'
import { SITE, formatNaira } from './site.js'

export function productPath(productId) {
  return `/product/${encodeURIComponent(productId)}`
}

export function productPageUrl(productId) {
  return new URL(productPath(productId), SITE.url).href
}

export function resolveItem(item) {
  const product = item.product ?? getProduct(item.productId)
  if (!product) return null
  const color = typeof item.color === 'object' && item.color ? item.color : getColor(product, item.color)
  const size = typeof item.size === 'object' && item.size ? item.size : getSize(product, item.size)
  const unitPrice = item.unitPrice ?? priceFor(product, size.label)
  return { product, color, size, unitPrice }
}

export function cartMessage(items) {
  const lines = ["🛍️ *JORA COLLECTION | ORDER REQUEST*", "", "Hello! I would love to order these bags:", ""]
  let totalQuantity = 0
  let subtotal = 0

  items.forEach((item, index) => {
    const resolved = resolveItem(item)
    if (!resolved) return
    const { product, color, size, unitPrice } = resolved
    totalQuantity += item.quantity
    subtotal += unitPrice * item.quantity
    lines.push(`*${index + 1}. ${product.name}*`)
    lines.push(`Colour: ${color.name}`)
    lines.push(`Style: ${CATEGORIES.find((category) => category.id === product.category)?.label ?? product.variant}`)
    lines.push(`Size: ${size.label} (${size.dimensions})`)
    lines.push(`Quantity: ${item.quantity}`)
    lines.push(`Unit price: ${formatNaira(unitPrice)}`)
    lines.push(`*Item total: ${formatNaira(unitPrice * item.quantity)}*`)
    lines.push(productPageUrl(product.id))
    lines.push('')
  })

  lines.push(`Total items: ${totalQuantity}`)
  lines.push(`*Subtotal: ${formatNaira(subtotal)}*`)
  lines.push('')
  lines.push('Please confirm availability, delivery and payment details. Thank you!')
  return lines.join('\n')
}

export function singleItemMessage(product, colorId, sizeLabel, quantity) {
  return cartMessage([{ product, color: colorId, size: sizeLabel, quantity }])
}
