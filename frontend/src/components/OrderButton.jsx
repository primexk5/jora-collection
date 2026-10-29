import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { defaultSize } from '../data/products'
import { cartMessage, productImageUrl, resolveItem } from '../lib/cart'
import { SITE, waLink } from '../lib/site'

export default function OrderButton({ product, items, children, ...props }) {
  const [order, setOrder] = useState(null)
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [sharing, setSharing] = useState(false)
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
        const controls = [...dialog.current.querySelectorAll('button:not(:disabled), a[href]')]
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
      setStatus('Choose WhatsApp, then select the JORA Collection chat to share your images and order details.')
    }).catch((error) => {
      if (error.name !== 'AbortError') setStatus('Images could not load. Close and try again, or send your order details below.')
    }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [order])

  const share = async () => {
    setSharing(true)
    try {
      await navigator.share({ files, text: order.message, title: 'JORA Collection order' })
      setStatus('Share menu closed. You can also open the JORA chat below to send the order details.')
    } catch (error) {
      setStatus(error.name === 'AbortError' ? 'Sharing cancelled. Your order is ready whenever you are.' : 'Sharing is unavailable. Download your images below and attach them in the JORA WhatsApp chat.')
    } finally { setSharing(false) }
  }
  const canShare = files.length > 0 && !!navigator.canShare?.({ files })

  return <>
    <button {...props} ref={button} type="button" onClick={() => {
      setFiles([])
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
          <p role="status" className="mt-3 text-sm leading-relaxed text-jora-charcoal/70">{status}</p>
          <p className="mt-2 text-sm">JORA Collection · {SITE.phoneDisplay}</p>
          <pre className="mt-4 max-h-52 overflow-y-auto whitespace-pre-wrap rounded-xl bg-jora-soft p-4 font-sans text-sm">{order.message}</pre>
          {canShare && <button type="button" disabled={loading || sharing} onClick={share} className="mt-4 w-full rounded-full bg-jora-red px-5 py-3 text-sm text-white disabled:opacity-50">{sharing ? 'Sharing…' : 'Share images & order'}</button>}
          {!loading && files.length > 0 && <div className="mt-3 space-y-2">
            {!canShare && <p className="text-sm text-jora-charcoal/70">Download the images and attach them in WhatsApp with your order.</p>}
            {files.map((file) => <DownloadImage key={file.name} file={file} />)}
          </div>}
          <a href={waLink(order.message)} target="_blank" rel="noreferrer" className="mt-4 block rounded-full border border-jora-red px-5 py-3 text-center text-sm text-jora-red">Open JORA chat with order details</a>
          <p className="mt-2 text-xs text-jora-charcoal/60">The chat link sends text. Attach downloaded images in the chat, or use the share button above. If WhatsApp omits the caption, send the details using this link.</p>
        </div>
      </div>, document.body)}
  </>
}

function DownloadImage({ file }) {
  const link = useRef(null)
  useEffect(() => {
    const next = URL.createObjectURL(file)
    link.current.href = next
    return () => URL.revokeObjectURL(next)
  }, [file])
  return <a ref={link} download={file.name} className="block break-all text-xs text-jora-red underline">Download {file.name}</a>
}
