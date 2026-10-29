export function canCopyOrderImage() {
  return typeof navigator !== 'undefined' && !!navigator.clipboard?.write &&
    typeof ClipboardItem !== 'undefined' && (!ClipboardItem.supports || ClipboardItem.supports('image/png'))
}

// Write immediately during the click: waiting for canvas work first can lose
// clipboard permission on mobile browsers. ClipboardItem accepts a PNG promise.
export function copyOrderImages(files, labels) {
  if (!files.length) return Promise.reject(new Error('Bag images are not ready'))
  if (!canCopyOrderImage()) return Promise.reject(new Error('Image clipboard is unavailable'))
  return navigator.clipboard.write([
    new ClipboardItem({ 'image/png': createOrderImage(files, labels) }),
  ])
}

async function createOrderImage(files, labels) {
  if (files.length === 1 && files[0].type === 'image/png') return files[0]
  const images = []
  try {
    for (const file of files) images.push(await createImageBitmap(file))
    const columns = Math.min(2, images.length)
    const canvas = document.createElement('canvas')
    canvas.width = columns * 500
    canvas.height = 80 + Math.ceil(images.length / columns) * 530
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Image creation unavailable')
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#1b2233'
    context.font = 'bold 26px sans-serif'
    context.fillText('JORA COLLECTION · YOUR ORDER', 24, 48)
    images.forEach((image, index) => {
      const x = (index % columns) * 500
      const y = 80 + Math.floor(index / columns) * 530
      const scale = Math.min(452 / image.width, 460 / image.height)
      const width = image.width * scale
      const height = image.height * scale
      context.drawImage(image, x + (500 - width) / 2, y + (460 - height) / 2, width, height)
      context.font = '16px sans-serif'
      context.fillText(labels[index], x + 24, y + 495, 452)
    })
    return await new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Image creation failed')), 'image/png'))
  } finally {
    images.forEach((image) => image.close())
  }
}
