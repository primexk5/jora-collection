import { getProduct } from '../data/products.js'
import { NAV } from './site.js'

export const ROUTE_IDS = [...NAV.map((item) => item.id), 'privacy']

export function routeFromLocation(location = window.location) {
  const hash = location.hash.replace(/^#/, '')
  const match = !hash && location.pathname.match(/^\/product\/([^/]+)\/?$/)
  const productId = hash.startsWith('bag/') ? hash.slice(4) : match?.[1]
  if (productId) {
    try {
      const product = getProduct(decodeURIComponent(productId))
      if (product) return { page: 'shop', product }
    } catch {
      // A malformed URL should still leave the storefront usable.
    }
  }
  return { page: ROUTE_IDS.includes(hash) ? hash : 'home', product: null }
}
