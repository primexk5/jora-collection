import test from 'node:test'
import assert from 'node:assert/strict'
import { PRODUCTS, getColors } from '../src/data/products.js'
import { searchProducts } from '../src/lib/search.js'

test('search handles names, colours, styles, empty queries and no matches', () => {
  assert.deepEqual(searchProducts(PRODUCTS, '  '), PRODUCTS)
  const product = PRODUCTS[0]
  assert.ok(searchProducts(PRODUCTS, `  ${product.name.toUpperCase()}  `).some((item) => item.id === product.id))
  const colour = getColors(product)[0].name
  assert.ok(searchProducts(PRODUCTS, `${product.name} ${colour}`).some((item) => item.id === product.id))
  assert.ok(searchProducts(PRODUCTS, 'tote').every((item) => item.category === 'totes'))
  assert.deepEqual(searchProducts(PRODUCTS, 'nonexistentproductxyz'), [])
})
