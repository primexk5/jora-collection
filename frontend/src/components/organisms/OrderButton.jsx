import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { defaultSize } from '../../data/products'
import { cartMessage } from '../../lib/cart'
import { SITE, waLink } from '../../lib/site'
import { WhatsAppIcon } from '../atoms/Icons'

export default function OrderButton({ product, items, children, ...props }) {
  const [order, setOrder] = useState(null)
  const dialog = useRef(null)
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

  return <>
    <button {...props} type="button" onClick={() => {
      const selected = items ?? [{ product, color: product.palette, size: defaultSize(product).label, quantity: 1 }]
      setOrder({ message: cartMessage(selected) })
    }}>{children}</button>
    {order && createPortal(
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-jora-navy/70 p-4" onClick={(event) => { if (event.target === event.currentTarget) setOrder(null) }}>
        <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 text-jora-charcoal shadow-xl outline-none">
          <div className="flex items-center justify-between gap-4">
            <h2 id={titleId} className="font-display text-2xl">Your order is ready</h2>
            <button type="button" onClick={() => setOrder(null)} aria-label="Close order sharing" className="rounded-full border border-jora-charcoal/15 px-3 py-2">✕</button>
          </div>
          <p className="mt-2 text-sm text-jora-charcoal/60">JORA Collection · {SITE.phoneDisplay}</p>
          <a href={waLink(order.message)} className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#128c4a] px-5 py-5 text-center text-base font-semibold text-white shadow-lg shadow-[#128c4a]/20 transition hover:bg-[#0e703b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128c4a]">
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
            Open JORA chat with order details
          </a>
          <p className="mt-3 text-center text-xs leading-relaxed text-jora-charcoal/60">Your order details and bag links will be ready to send in WhatsApp.</p>
          <details className="mt-5 rounded-xl bg-jora-soft p-4">
            <summary className="cursor-pointer text-sm font-medium">Review order details</summary>
            <pre className="mt-3 max-h-52 overflow-y-auto whitespace-pre-wrap font-sans text-sm">{order.message}</pre>
          </details>
        </div>
      </div>, document.body)}
  </>
}
