import { productPath } from '../../lib/cart'
import OrderButton from './OrderButton'
import { useEffect, useRef } from 'react'
import { CATEGORIES } from '../../data/products'
import { formatNaira } from '../../lib/site'
import BagArt from '../atoms/BagArt'
import { ArrowIcon, BagIcon, CloseIcon, TrashIcon, WhatsAppIcon } from '../atoms/Icons'
import QuantityStepper from '../molecules/QuantityStepper'

export default function CartDrawer({
  items,
  count,
  subtotal,
  onClose,
  onUpdateQuantity,
  onRemove,
  onClear,
  onNavigate,
}) {
  const closeRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [onClose])

  const empty = items.length === 0

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <button
        type="button"
        aria-label="Close bag"
        onClick={onClose}
        className="absolute inset-0 bg-jora-navy/60 backdrop-blur-sm"
      />

      <aside className="anim-drawer relative z-10 flex h-full w-full max-w-md flex-col bg-jora-soft">
        <header className="flex items-start justify-between gap-4 border-b border-jora-charcoal/10 px-5 py-5">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-jora-red">
              <BagIcon className="h-3.5 w-3.5" />
              Your bag
            </p>
            <h2 id="cart-title" className="mt-1.5 font-display text-2xl text-jora-charcoal">
              {empty ? 'Nothing in here yet' : `${count} ${count === 1 ? 'piece' : 'pieces'} selected`}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close bag"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-jora-charcoal/15 text-jora-charcoal/70 transition hover:border-jora-red hover:text-jora-red"
          >
            <CloseIcon />
          </button>
        </header>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full border border-dashed border-jora-red/30" />
              <BagArt variant="tote" palette="gold" className="relative h-full w-full p-2" />
            </div>
            <p className="mt-4 font-display text-2xl text-jora-charcoal">Your bag is waiting.</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-jora-charcoal/55">
              Add a bag you love, choose the colour and size, then order everything at once on
              WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose()
                onNavigate('shop')
              }}
              className="btn-sweep mt-6 inline-flex items-center gap-2 rounded-full bg-jora-red px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white"
              style={{ '--sweep-bg': '#1b2233' }}
            >
              Shop the collection
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5">
            <ul className="divide-y divide-jora-charcoal/8">
              {items.map((item) => {
                const category = CATEGORIES.find((entry) => entry.id === item.product.category)
                return (
                  <li key={item.key} className="flex gap-3 py-4">
                    <a
                      href={productPath(item.product.id)}
                      onClick={onClose}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-jora-charcoal/8 bg-white"
                    >
                      <BagArt
                        variant={item.product.variant}
                        palette={item.color.id}
                        className="h-full w-full p-1"
                      />
                    </a>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-jora-charcoal/35">
                            {category?.label ?? item.product.category}
                          </p>
                          <a
                            href={productPath(item.product.id)}
                            onClick={onClose}
                            className="mt-0.5 block truncate font-display text-base text-jora-charcoal transition hover:text-jora-red"
                          >
                            {item.product.name}
                          </a>
                          <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-jora-charcoal/45">
                            {item.color.name} · {item.size.label}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(item.key)}
                          aria-label={`Remove ${item.product.name} from bag`}
                          className="shrink-0 rounded-full p-1.5 text-jora-charcoal/35 transition hover:bg-jora-red/10 hover:text-jora-red"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                        <QuantityStepper
                          size="sm"
                          value={item.quantity}
                          onChange={(value) => onUpdateQuantity(item.key, value)}
                          label={`Quantity for ${item.product.name}`}
                        />
                        <p className="whitespace-nowrap font-display text-sm text-jora-charcoal">
                          {formatNaira(item.lineTotal)}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {!empty && (
          <div className="border-t border-jora-charcoal/10 bg-white px-5 pb-5 pt-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-jora-charcoal/40">
                  Subtotal · {count} {count === 1 ? 'item' : 'items'}
                </p>
                <p className="mt-1 text-[10px] text-jora-charcoal/40">
                  Delivery and gift wrap confirmed in chat.
                </p>
              </div>
              <p className="font-display text-2xl text-jora-charcoal">{formatNaira(subtotal)}</p>
            </div>

            <OrderButton items={items}
              className="btn-sweep mt-4 flex items-center justify-center gap-2 rounded-full bg-jora-red px-5 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white"
              style={{ '--sweep-bg': '#1b2233' }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order {count} {count === 1 ? 'bag' : 'bags'} on WhatsApp
            </OrderButton>

            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={onClear}
                className="text-[9px] font-medium uppercase tracking-[0.14em] text-jora-charcoal/40 underline decoration-jora-charcoal/20 underline-offset-4 transition hover:text-jora-red"
              >
                Clear bag
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-[9px] font-medium uppercase tracking-[0.14em] text-jora-charcoal/55 transition hover:text-jora-red"
              >
                Continue shopping
              </button>
            </div>

            <p className="mt-3 text-[9px] leading-relaxed text-jora-charcoal/35">
              Your WhatsApp message includes bag details, quantities and prices. Your bag is saved on this device.
            </p>
          </div>
        )}
      </aside>
    </div>
  )
}
