import test from 'node:test'
import assert from 'node:assert/strict'
import { canCopyOrderImage, copyOrderImages } from '../src/lib/orderImages.js'

test('clipboard receives one PNG immediately; multiple bags combine and resources close', async (t) => {
  const names = ['navigator', 'ClipboardItem', 'createImageBitmap', 'document']
  const previous = new Map(names.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]))
  t.after(() => {
    for (const [name, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor)
      else delete globalThis[name]
    }
  })
  const set = (name, value) => Object.defineProperty(globalThis, name, { configurable: true, value })
  let written
  set('navigator', { clipboard: { write(items) { written = items; return Promise.all(items.map((item) => item.data['image/png'])) } } })
  set('ClipboardItem', class {
    constructor(data) { this.data = data }
    static supports(type) { return type === 'image/png' }
  })
  assert.equal(canCopyOrderImage(), true)
  const bag = new Blob(['test PNG'], { type: 'image/png' })
  const single = copyOrderImages([bag], ['Ada · Gold'])
  assert.equal(written.length, 1, 'clipboard write starts before awaiting image work')
  assert.deepEqual(Object.keys(written[0].data), ['image/png'])
  assert.equal((await single)[0], bag)

  let closed = 0
  let draws = 0
  const labels = []
  const combined = new Blob(['combined PNG'], { type: 'image/png' })
  const canvas = {
    width: 0, height: 0,
    getContext: () => ({ fillRect() {}, fillText(text) { labels.push(text) }, drawImage() { draws++ } }),
    toBlob(callback, type) { assert.equal(type, 'image/png'); callback(combined) },
  }
  set('createImageBitmap', async () => ({ width: 1176, height: 1470, close() { closed++ } }))
  set('document', { createElement(name) { assert.equal(name, 'canvas'); return canvas } })
  assert.equal((await copyOrderImages([bag, bag], ['Ada · Gold', 'Amara · Noir']))[0], combined)
  assert.equal(written.length, 1)
  assert.equal(draws, 2)
  assert.equal(closed, 2)
  assert.equal(canvas.width, 1000)
  assert.equal(canvas.height, 610)
  assert.ok(labels.includes('Ada · Gold'))
  assert.ok(labels.includes('Amara · Noir'))

  canvas.toBlob = (callback) => callback(null)
  await assert.rejects(copyOrderImages([bag, bag], ['Ada', 'Amara']), /Image creation failed/)
  assert.equal(closed, 4, 'image resources also close when rendering fails')
  await assert.rejects(copyOrderImages([], []), /not ready/)
  set('navigator', {})
  assert.equal(canCopyOrderImage(), false)
  await assert.rejects(copyOrderImages([bag], ['Ada']), /unavailable/)
})
