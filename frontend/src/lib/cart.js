import { getColor, getProduct, getSize, priceFor } from '../data/products'
import { formatNaira } from './site'

function siteRoot() {
  const base = import.meta.env.BASE_URL || '/'
  return new URL(base, `${window.location.origin}/`).href
}

export function productImageUrl(productId, colorId) {
  return new URL(`bags/${productId}-${colorId}.png`, siteRoot()).href
}

export function productPageUrl(productId) {
  return `${siteRoot()}#bag/${productId}`
}

export function resolveItem(item) {
  const product = item.product ?? getProduct(item.productId)
  if (!product) return null
  const color = typeof item.color === 'string' ? getColor(product, item.color) : item.color
  const size = typeof item.size === 'string' ? getSize(product, item.size) : item.size
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
    lines.push(`Size: ${size.label} (${size.dimensions})`)
    lines.push(`Quantity: ${item.quantity}`)
    lines.push(`Unit price: ${formatNaira(unitPrice)}`)
    lines.push(`*Item total: ${formatNaira(unitPrice * item.quantity)}*`)
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
