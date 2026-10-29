import { ArrowIcon, WhatsAppIcon } from './Icons'
import { CATEGORIES, FEATURED } from '../data/products'
import { GENERAL_ORDER_LINK, formatNaira } from '../lib/site'

export default function MobileHomeHero({ onNavigate, onShopCategory }) {
  return (
    <section className="bg-jora-soft pb-6 pt-5 md:hidden" aria-label="Discover JORA">
      <div className="shell">
        <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em]">
          <span className="flex items-center gap-2 text-jora-charcoal/55"><span className="h-1.5 w-1.5 rounded-full bg-jora-red" />Curated in Abuja</span>
          <button type="button" onClick={() => onNavigate('new-arrivals')} className="min-h-11 font-medium text-jora-red">Explore new in ↗</button>
        </div>
        <h1 className="mt-1 font-display text-[clamp(2.15rem,10.3vw,3.8rem)] leading-[1.08] tracking-tight text-jora-charcoal">
          Your day. Your bag.<br /><span className="text-jora-red">Carry confidence.</span>
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-jora-charcoal/60">For work days, weekend plans and everything that makes you, you.</p>
        <a href={`#bag/${FEATURED.id}`} className="group relative mt-5 block overflow-hidden rounded-[1.75rem] bg-[#eae0d0]">
          <div className="absolute left-5 top-5 z-10">
            <span className="rounded-full bg-white/80 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em]">The Gold Edit</span>
          </div>
          <div className="absolute right-5 top-5 font-script text-3xl text-[#806138]">Made to stand out</div>
          <div className="relative flex h-[230px] items-center justify-center pt-6 min-[400px]:h-[260px]">
            <div className="absolute h-44 w-44 rounded-full border border-white/60" />
            <img src={`${import.meta.env.BASE_URL}bags/${FEATURED.id}-${FEATURED.palette}.png`} alt={FEATURED.name} fetchPriority="high" width="400" height="400" className="relative h-full w-full object-contain px-8 transition-transform group-hover:scale-105" />
          </div>
          <div className="relative flex items-center justify-between gap-3 bg-white/80 px-5 py-4">
            <div><p className="text-[9px] uppercase tracking-[0.18em] text-jora-charcoal/50">In the spotlight</p><h2 className="mt-1 font-display text-lg">{FEATURED.name}</h2></div>
            <div className="text-right"><p className="text-sm font-medium">{formatNaira(FEATURED.price)}</p><span className="mt-1 flex items-center justify-end gap-1 text-xs text-jora-red">Discover <ArrowIcon className="h-3 w-3" /></span></div>
          </div>
        </a>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
          <button type="button" onClick={() => onNavigate('shop')} className="flex min-h-12 items-center justify-center gap-3 rounded-full bg-jora-red px-5 text-xs font-medium text-white">Find your next favourite <ArrowIcon className="h-4 w-4" /></button>
          <a href={GENERAL_ORDER_LINK} target="_blank" rel="noreferrer" aria-label="Chat with JORA on WhatsApp" className="grid h-12 w-12 place-items-center rounded-full border border-jora-charcoal/15 bg-white text-jora-charcoal"><WhatsAppIcon className="h-5 w-5" /></a>
        </div>
        <p className="mt-3 text-center text-[10px] text-jora-charcoal/55">Nationwide delivery · Personal service on WhatsApp</p>
      </div>
      <nav aria-label="Quick shop categories" className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {CATEGORIES.map((category) => <button key={category.id} type="button" onClick={() => onShopCategory(category.id)} className="min-h-11 shrink-0 rounded-full border border-jora-charcoal/10 bg-white px-5 text-xs text-jora-charcoal/80">{category.label}</button>)}
      </nav>
    </section>
  )
}
