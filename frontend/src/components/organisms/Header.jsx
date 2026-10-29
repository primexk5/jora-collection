import { useEffect, useState } from 'react'
import { GENERAL_ORDER_LINK, NAV, SITE } from '../../lib/site'
import { BagIcon, CloseIcon, MenuIcon, PhoneIcon, SearchIcon, WhatsAppIcon } from '../atoms/Icons'
import Logo from '../atoms/Logo'

export default function Header({ page, onNavigate, cartCount = 0, onOpenCart, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

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
    setSearchOpen(false)
    onNavigate(id)
  }

  return (
    <>
      <div className="hidden bg-jora-navy text-white md:block">
        <div className="shell flex h-8 items-center justify-center sm:h-9 sm:justify-between gap-4">
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
        <div className="shell relative flex h-20 items-center justify-between bg-white md:hidden">
          <button type="button" onClick={() => setSearchOpen((open) => !open)} aria-label={searchOpen ? 'Close search' : 'Search bags'} aria-expanded={searchOpen} aria-controls="mobile-search" className="grid h-11 w-11 place-items-center rounded-full text-jora-charcoal transition hover:bg-jora-soft">{searchOpen ? <CloseIcon /> : <SearchIcon />}</button>
          <a href="/#home" onClick={(event) => { event.preventDefault(); go('home') }} aria-label="JORA Collection — home" className="absolute left-1/2 -translate-x-1/2"><Logo compact /></a>
          <button type="button" onClick={onOpenCart} aria-label={`Open shopping bag, ${cartCount} items`} className="relative grid h-11 w-11 place-items-center rounded-full text-jora-charcoal"><BagIcon className="h-5 w-5" />{cartCount > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-jora-red px-1 text-[8px] text-white">{cartCount > 99 ? '99+' : cartCount}</span>}</button>
        </div>
        {searchOpen && <form id="mobile-search" role="search" onSubmit={(event) => {
          event.preventDefault()
          onSearch(query.trim())
          setSearchOpen(false)
        }} onKeyDown={(event) => { if (event.key === 'Escape') setSearchOpen(false) }} className="flex gap-2 bg-white px-5 pb-4 md:hidden">
          <label htmlFor="header-search" className="sr-only">Search bags</label>
          <input id="header-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search bags, colours, styles…" autoFocus className="min-w-0 flex-1 rounded-xl border border-jora-charcoal/15 bg-jora-soft px-4 py-3 text-base outline-none focus:border-jora-red" />
          <button type="submit" className="rounded-xl bg-jora-red px-4 text-sm font-medium text-white">Search</button>
        </form>}
        <div className="flex h-9 items-center justify-center bg-jora-red px-3 text-center text-[clamp(7px,2.2vw,9px)] font-medium uppercase tracking-[0.15em] text-white md:hidden">Nationwide delivery · Personal service on WhatsApp</div>
        <div className="shell hidden h-[74px] items-center justify-between gap-6 md:flex">
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
          <div id="mobile-menu" className="anim-fade max-h-[calc(100dvh-12rem)] overflow-y-auto border-t border-jora-charcoal/10 bg-jora-soft hidden md:block lg:hidden">
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
