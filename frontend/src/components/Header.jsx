import { useEffect, useState } from 'react'
import { GENERAL_ORDER_LINK, NAV, SITE } from '../lib/site'
import { BagIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from './Icons'
import Logo from './Logo'

export default function Header({ page, onNavigate, cartCount = 0, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const go = (id) => {
    setMenuOpen(false)
    onNavigate(id)
  }

  return (
    <>
      <div className="bg-jora-navy text-white">
        <div className="shell flex h-9 items-center justify-between gap-4">
          <p className="truncate text-[10px] uppercase tracking-[0.18em] text-white/75 sm:text-[11px]">
            {SITE.freeDeliveryNote}
          </p>
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/80 transition hover:text-jora-gold sm:flex"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-jora-charcoal/10 bg-jora-soft/90 backdrop-blur-xl">
        <div className="shell flex h-[74px] items-center justify-between gap-6">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault()
              go('home')
            }}
            className="rounded-full"
            aria-label="JORA Collection — go to home"
          >
            <Logo />
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = page === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.17em] transition-colors ${
                    active ? 'text-jora-red' : 'text-jora-charcoal/70 hover:text-jora-charcoal'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 bottom-0 h-px origin-left bg-jora-red transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={GENERAL_ORDER_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-sweep hidden items-center gap-2 rounded-full bg-jora-red px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white sm:inline-flex"
              style={{ '--sweep-bg': '#1b2233' }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order Now
            </a>
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag${cartCount > 0 ? `, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : ''}`}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-jora-charcoal/15 text-jora-charcoal transition hover:border-jora-red hover:text-jora-red"
            >
              <BagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="count-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-jora-red px-1 text-[9px] font-medium text-white"
                >
                  {cartCount > 20 ? '20+' : cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full border border-jora-charcoal/15 text-jora-charcoal transition hover:border-jora-red hover:text-jora-red lg:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="anim-fade border-t border-jora-charcoal/10 bg-jora-soft lg:hidden">
            <nav aria-label="Mobile navigation" className="shell py-4">
              {NAV.map((item) => {
                const active = page === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex w-full items-center justify-between border-b border-jora-charcoal/10 py-3.5 text-left text-sm uppercase tracking-[0.16em] transition-colors ${
                      active ? 'text-jora-red' : 'text-jora-charcoal/80'
                    }`}
                  >
                    {item.label}
                    <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-jora-red' : 'bg-transparent'}`} />
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  onOpenCart()
                }}
                className="mt-4 flex w-full items-center justify-between rounded-2xl border border-jora-charcoal/15 px-4 py-3.5 text-sm uppercase tracking-[0.16em] text-jora-charcoal/80 transition hover:border-jora-red hover:text-jora-red"
              >
                <span className="flex items-center gap-2.5">
                  <BagIcon className="h-4 w-4" />
                  Your bag
                </span>
                <span className="text-[10px] tracking-[0.12em] text-jora-charcoal/45">
                  {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : 'Empty'}
                </span>
              </button>
              <a
                href={GENERAL_ORDER_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-jora-red px-5 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
