import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { defaultSize } from '../data/products'
import { cartMessage, productImageUrl, resolveItem } from '../lib/cart'
import { SITE, waLink } from '../lib/site'
import { WhatsAppIcon } from './Icons'

export default function OrderButton({ product, items, children, ...props }) {
  const [order, setOrder] = useState(null)
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [opening, setOpening] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const dialog = useRef(null)
  const button = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!order) return
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.focus()
    const onKey = (event) => {
      event.stopPropagation()
      if (event.key === 'Escape') setOrder(null)
      if (event.key === 'Tab') {
        const controls = [...dialog.current.querySelectorAll('button:not(:disabled), a[href], summary')]
        const first = controls[0]
        const last = controls.at(-1)
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
          event.preventDefault(); last?.focus()
        } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) {
          event.preventDefault(); first?.focus()
        }
      }
    }
    dialog.current.addEventListener('keydown', onKey)
    const element = dialog.current
    return () => {
      element.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [order])

  useEffect(() => {
    if (!order) return
    const controller = new AbortController()
    const unique = [...new Map(order.items.map(resolveItem).filter(Boolean).map((item) => [`${item.product.id}-${item.color.id}`, item])).values()]
    Promise.all(unique.map(async ({ product: bag, color }) => {
      const response = await fetch(productImageUrl(bag.id, color.id), { signal: controller.signal })
      if (!response.ok) throw new Error('Image unavailable')
      const blob = await response.blob()
      if (!blob.type.startsWith('image/')) throw new Error('Invalid image')
      return new File([blob], `${bag.id}-${color.id}.png`, { type: blob.type })
    })).then((images) => {
      setFiles(images)
      setStatus('Your order is ready.')
    }).catch((error) => {
      if (error.name !== 'AbortError') setStatus('Images could not load. Close and try again, or send your order details below.')
    }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [order])

  const share = async () => {
    setSharing(true)
    try {
      await navigator.share({ files, text: order.message, title: 'JORA Collection order' })
      setStatus('You can open the JORA chat above to send the order details.')
    } catch (error) {
      setStatus(error.name === 'AbortError' ? 'Sharing cancelled. Your order is ready whenever you are.' : 'Image sharing is unavailable in this browser. You can still open the JORA chat with your order details.')
    } finally { setSharing(false) }
  }
  const canShare = files.length > 0 && !!navigator.share && !!navigator.canShare?.({ files })
  const canCopy = !copyFailed && files.length > 0 && !!navigator.clipboard?.write && typeof ClipboardItem !== 'undefined' && (!ClipboardItem.supports || ClipboardItem.supports('image/png'))

  const openChat = async (event) => {
    if (opening) { event.preventDefault(); return }
    if (!canCopy) return
    event.preventDefault()
    setOpening(true)
    try {
      // Pass the image promise directly to preserve the click's clipboard permission.
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': orderImage(files) })])
      setStatus('Bag images copied. Paste them into the JORA chat to attach them.')
      window.location.assign(waLink(order.message))
    } catch {
      setStatus('Your browser could not copy the images. Open the chat for order details, or use Share images below.')
      // A second click must still let the customer reach the chat without a permission loop.
      setCopyFailed(true)
    } finally {
      setOpening(false)
    }
  }

  return <>
    <button {...props} ref={button} type="button" onClick={() => {
      setFiles([])
      setCopyFailed(false)
      setLoading(true)
      setStatus('Preparing your bag images…')
      const selected = items ?? [{ product, color: product.palette, size: defaultSize(product).label, quantity: 1 }]
      setOrder({ items: selected, message: cartMessage(selected) })
    }}>{children}</button>
    {order && createPortal(
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-jora-navy/70 p-4" onClick={(event) => { if (event.target === event.currentTarget) setOrder(null) }}>
        <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 text-jora-charcoal shadow-xl outline-none">
          <div className="flex items-center justify-between gap-4">
            <h2 id={titleId} className="font-display text-2xl">Share your order</h2>
            <button type="button" onClick={() => setOrder(null)} aria-label="Close order sharing" className="rounded-full border border-jora-charcoal/15 px-3 py-2">✕</button>
          </div>
          <p className="mt-2 text-sm text-jora-charcoal/60">JORA Collection · {SITE.phoneDisplay}</p>
          <a href={waLink(order.message)} onClick={openChat} aria-busy={opening} className={`mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#128c4a] px-5 py-5 text-center text-base font-semibold text-white shadow-lg shadow-[#128c4a]/20 transition hover:bg-[#0e703b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128c4a] ${opening ? 'pointer-events-none opacity-70' : ''}`}>
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
            {opening ? 'Copying images & opening chat…' : 'Open JORA chat with order details'}
          </a>
          <p className="mt-3 text-center text-xs leading-relaxed text-jora-charcoal/60">
            {canCopy ? 'Your bag images will be copied. Paste them into the WhatsApp chat to attach them, then send your order.' : 'Your order details will be ready to send in WhatsApp.'}
          </p>
          <p role="status" className="mt-3 text-center text-xs leading-relaxed text-jora-charcoal/60">{status}</p>
          {canShare && <div className="mt-5 border-t border-jora-charcoal/10 pt-4 text-center">
            <button type="button" disabled={loading || sharing || opening} onClick={share} className="rounded-full border border-jora-charcoal/15 px-5 py-2.5 text-xs font-medium text-jora-charcoal/70 transition hover:border-jora-red hover:text-jora-red disabled:opacity-50">{sharing ? 'Sharing…' : 'Share bag images & order'}</button>
            <p className="mt-2 text-xs text-jora-charcoal/50">Choose WhatsApp, then the JORA Collection chat.</p>
          </div>}
          <details className="mt-5 rounded-xl bg-jora-soft p-4">
            <summary className="cursor-pointer text-sm font-medium">Review order details</summary>
            <pre className="mt-3 max-h-52 overflow-y-auto whitespace-pre-wrap font-sans text-sm">{order.message}</pre>
          </details>
        </div>
      </div>, document.body)}
  </>
}

// The clipboard accepts one PNG; combine multi-bag orders into one labelled image.
async function orderImage(files) {
  if (files.length === 1 && files[0].type === 'image/png') return files[0]
  const images = []
  try {
    for (const file of files) images.push(await createImageBitmap(file))
    const columns = Math.min(2, images.length)
    const canvas = document.createElement('canvas')
    canvas.width = columns * 500
    canvas.height = 80 + Math.ceil(images.length / columns) * 420
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Image composition unavailable')
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#1b2233'
    context.font = 'bold 26px sans-serif'
    context.fillText('JORA COLLECTION · YOUR BAGS', 24, 48)
    images.forEach((image, index) => {
      const x = (index % columns) * 500
      const y = 80 + Math.floor(index / columns) * 420
      const scale = Math.min(452 / image.width, 350 / image.height)
      const width = image.width * scale
      const height = image.height * scale
      context.drawImage(image, x + (500 - width) / 2, y + (350 - height) / 2, width, height)
      context.font = '16px sans-serif'
      const label = files[index].name.replace(/\.png$/, '').replaceAll('-', ' ')
      context.fillText(label, x + 24, y + 385, 452)
    })
    return await new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Image creation failed')), 'image/png'))
  } finally {
    images.forEach((image) => image.close())
  }
}
