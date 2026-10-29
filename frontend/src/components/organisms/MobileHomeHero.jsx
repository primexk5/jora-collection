import BagArt from '../atoms/BagArt'
import { ArrowIcon } from '../atoms/Icons'
import { CATEGORIES, FEATURED } from '../../data/products'
import { productPath } from '../../lib/cart'

export default function MobileHomeHero({ onNavigate, onShopCategory }) {
  return (
    <section className="bg-white md:hidden" aria-label="Discover JORA">
      <div className="mobile-home-hero relative isolate grid grid-rows-[auto_minmax(10rem,1fr)_auto] overflow-hidden bg-[#d9c7ad]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,#fbf5e8_0%,#d9c7ad_58%,#a68b67_100%)]" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-5 pt-5 text-[9px] font-medium uppercase tracking-[0.16em] text-jora-charcoal/70">
          <span>JORA · The Gold Edit</span><span>Curated in Abuja</span>
        </div>
        <a href={productPath(FEATURED.id)} aria-label={`Discover ${FEATURED.name}`} className="relative mx-5 block min-h-40 overflow-hidden">
          <BagArt variant={FEATURED.variant} palette={FEATURED.palette} className="absolute inset-0 h-full w-full scale-150" />
        </a>
        <div className="relative bg-gradient-to-t from-[#241d16]/95 via-[#241d16]/75 to-transparent px-5 pb-5 pt-5 text-white">
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/75">Every day deserves a beautiful bag</p>
          <h1 className="mt-2 font-display text-[clamp(2.4rem,10.5vw,3.75rem)] leading-[1.02]">Confidence<br /><span className="text-[#edd5af]">you carry.</span></h1>
          <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-white/80">Hand-picked bags. A little everyday luxury. Delivered to your door.</p>
          <button type="button" onClick={() => onNavigate('shop')} className="mt-4 flex min-h-12 w-full items-center justify-between gap-3 rounded-sm bg-white px-4 text-[10px] font-medium uppercase tracking-[0.12em] text-jora-charcoal">Explore the collection <ArrowIcon className="h-4 w-4 shrink-0" /></button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-jora-charcoal/10 px-5 pt-6">
        <h2 className="font-display text-xl">What&apos;s your everyday?</h2>
        <span className="text-[9px] uppercase tracking-[0.16em] text-jora-charcoal/40">Find your shape</span>
      </div>
      <nav aria-label="Quick shop categories" className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4">
        {CATEGORIES.map((category) => <button key={category.id} type="button" onClick={() => onShopCategory(category.id)} className="min-h-11 shrink-0 rounded-full border border-jora-charcoal/10 bg-jora-soft px-5 text-xs text-jora-charcoal/80">{category.label}</button>)}
      </nav>
    </section>
  )
}
