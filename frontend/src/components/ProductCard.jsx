import OrderButton from './OrderButton'
import { CATEGORIES } from '../data/products'
import { formatNaira } from '../lib/site'
import BagArt from './BagArt'
import { ArrowIcon, WhatsAppIcon } from './Icons'

const BADGE_STYLES = {
  New: 'bg-jora-red text-white',
  Bestseller: 'bg-jora-navy text-white',
}

export default function ProductCard({ product, delay = 0 }) {
  const category = CATEGORIES.find((item) => item.id === product.category)

  return (
    <article
      className="group reveal flex flex-col"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden rounded-[1.75rem] border border-jora-charcoal/5 bg-white">
        <a
          href={`#bag/${product.id}`}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(circle_at_50%_32%,#ffffff_0%,#f2f2f3_58%,#e8e9eb_100%)]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-jora-charcoal/8" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55" />
            <BagArt
              variant={product.variant}
              palette={product.palette}
              className="art-grayscale art-sway absolute inset-0 h-full w-full p-7"
            />
            {product.badge && (
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] ${
                  BADGE_STYLES[product.badge] ?? 'bg-jora-gold text-jora-charcoal'
                }`}
              >
                {product.badge}
              </span>
            )}
            <span className="absolute right-4 top-4 grid h-2.5 w-2.5 place-items-center rounded-full bg-jora-red" />
          </div>
        </a>
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <OrderButton product={product}
            className="pointer-events-auto flex items-center justify-center gap-2 rounded-full bg-jora-navy px-4 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-jora-red"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order on WhatsApp
          </OrderButton>
        </div>
      </div>

      <div className="mt-4 flex flex-1 items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-jora-charcoal/40">
            {category?.label ?? product.category}
          </p>
          <h3 className="mt-1 font-display text-lg leading-snug text-jora-charcoal">
            <a href={`#bag/${product.id}`} className="transition hover:text-jora-red">
              {product.name}
            </a>
          </h3>
          <a
            href={`#bag/${product.id}`}
            className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-jora-red transition hover:text-jora-navy"
          >
            View details
            <ArrowIcon className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="whitespace-nowrap pt-1 font-display text-base text-jora-charcoal/80">
          {formatNaira(product.price)}
        </p>
      </div>
    </article>
  )
}
