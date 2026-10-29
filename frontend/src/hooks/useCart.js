import { useCallback, useEffect, useMemo, useState } from 'react'
import { PRODUCTS, getColor, getSize, priceFor } from '../data/products'

const STORAGE_KEY = 'jora-cart-v1'
const MAX_QUANTITY = 20

function makeKey(item) {
  return `${item.productId}|${item.color}|${item.size}`
}

function sanitize(rawItems) {
  if (!Array.isArray(rawItems)) return []
  return rawItems.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const product = PRODUCTS.find((entry) => entry.id === item.productId)
    if (!product) return []
    const color = getColor(product, item.color)
    const size = getSize(product, item.size)
    const quantity = Math.min(MAX_QUANTITY, Math.max(1, Number(item.quantity) || 1))
    return [{ productId: product.id, color: color.id, size: size.label, quantity }]
  })
}

function loadCart() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? sanitize(JSON.parse(stored)) : []
  } catch {
    return []
  }
}

export default function useCart() {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      return
    }
  }, [items])

  const add = useCallback((productId, color, size, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.min(MAX_QUANTITY, Number(quantity) || 1))
    setItems((current) => {
      const nextItem = { productId, color, size, quantity: safeQuantity }
      const key = makeKey(nextItem)
      const exists = current.some((item) => makeKey(item) === key)
      if (exists) {
        return current.map((item) =>
          makeKey(item) === key
            ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + safeQuantity) }
            : item,
        )
      }
      return [...current, nextItem]
    })
  }, [])

  const updateQuantity = useCallback((key, quantity) => {
    const safeQuantity = Math.max(1, Math.min(MAX_QUANTITY, Number(quantity) || 1))
    setItems((current) =>
      current.map((item) =>
        makeKey(item) === key ? { ...item, quantity: safeQuantity } : item,
      ),
    )
  }, [])

  const remove = useCallback((key) => {
    setItems((current) => current.filter((item) => makeKey(item) !== key))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const detailedItems = useMemo(
    () =>
      items.flatMap((item) => {
        const product = PRODUCTS.find((entry) => entry.id === item.productId)
        if (!product) return []
        const color = getColor(product, item.color)
        const size = getSize(product, item.size)
        const unitPrice = priceFor(product, item.size)
        return [
          {
            ...item,
            key: makeKey(item),
            product,
            color,
            size,
            unitPrice,
            lineTotal: unitPrice * item.quantity,
          },
        ]
      }),
    [items],
  )

  const count = useMemo(
    () => detailedItems.reduce((total, item) => total + item.quantity, 0),
    [detailedItems],
  )

  const subtotal = useMemo(
    () => detailedItems.reduce((total, item) => total + item.lineTotal, 0),
    [detailedItems],
  )

  return { items: detailedItems, add, updateQuantity, remove, clear, count, subtotal }
}
