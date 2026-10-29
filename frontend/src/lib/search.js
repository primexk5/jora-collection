import { CATEGORIES, getColors } from '../data/products.js'

export function searchProducts(products, query) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return products.filter((product) => {
    const category = CATEGORIES.find((item) => item.id === product.category)
    const text = [product.name, category?.label, product.variant, ...(product.tags ?? []), ...getColors(product).map((color) => color.name)].join(' ').toLowerCase()
    return terms.every((term) => text.includes(term))
  })
}
