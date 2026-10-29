import { useMemo, useState } from 'react'
import {
  CATEGORIES,
  PRODUCTS,
  defaultSize,
  getColor,
  getColors,
  getDescription,
  getSize,
  getSizes,
  getSpecs,
  priceFor,
} from '../data/products'
import { singleItemMessage } from '../lib/cart'
import { formatNaira, waLink } from '../lib/site'
import BagArt from '../components/BagArt'
import ProductGrid from '../components/ProductGrid'
import QuantityStepper from '../components/QuantityStepper'
import {
  ArrowIcon,
  ClockIcon,
  GiftIcon,
  PinIcon,
  PlusIcon,
  WhatsAppIcon,
} from '../components/Icons'

const BADGE_STYLES = {
  New: 'bg-jora-red text-white',
  Bestseller: 'bg-jora-navy text-white',
}

export default function ProductDetail({ product, onAddToCart, onOpenCart, onNavigate }) {
  const [selectedColor, setSelectedColor] = useState(product.palette)
  const [selectedSize, setSelectedSize] = useState(() => defaultSize(product).label)
  const [quantity, setQuantity] = useState(1)

  const category = CATEGORIES.find((item) => item.id === product.category)
  const colors = getColors(product)
  const sizes = getSizes(product)
  const specs = getSpecs(product)
  const description = getDescription(product)
  const color = getColor(product, selectedColor)
  const size = getSize(product, selectedSize)
  const price = priceFor(product, selectedSize)

  const related = useMemo(() => {
    const sameCategory = PRODUCTS.filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    const rest = PRODUCTS.filter(
      (item) => item.category !== product.category && item.id !== product.id,
    )
    return [...sameCategory, ...rest].slice(0, 4)
  }, [product])

  const addToBag = () => {
    onAddToCart({ product, color: selectedColor, size: selectedSize, quantity })
  }

  return (
    <div className="pb-20 pt-6 sm:pt-10">
      <div className="shell">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-jora-charcoal/40">
          <a href="#shop" onClick={(event) => { event.preventDefault(); onNavigate('shop') }} className="transition hover:text-jora-red">
            Shop
          </a>
          <span aria-hidden="true">/</span>
          <span>{category?.label ?? product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-jora-charcoal/70">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
          <div>
            <div
              data-product-art
              className="relative overflow-hidden rounded-[2rem] border border-jora-charcoal/5 bg-[radial-gradient(circle_at_50%_30%,#ffffff_0%,#f2f2f3_56%,#e6e7e9_100%)]"
            >
              <div className="relative aspect-[4/5]">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-jora-charcoal/8" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55" />
                <BagArt
                  variant={product.variant}
                  palette={color.id}
                  className="absolute inset-0 h-full w-full p-10 sm:p-14"
                />

                {product.badge && (
                  <span
                    className={`absolute left-5 top-5 rounded-full px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] ${
                      BADGE_STYLES[product.badge] ?? 'bg-jora-gold text-jora-charcoal'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-white/70 backdrop-blur">
                  <span
                    className="h-4 w-4 rounded-full border border-jora-charcoal/15"
                    style={{ backgroundColor: color.hex }}
                  />
                </span>

                <p className="absolute bottom-5 left-5 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/60 backdrop-blur">
                  JORA · {color.name}
                </p>
              </div>
            </div>

            {colors.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {colors.map((option) => {
                  const active = option.id === selectedColor
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedColor(option.id)}
                      aria-pressed={active}
                      aria-label={`Preview ${option.name}`}
                      className={`group/thumb relative h-24 w-20 overflow-hidden rounded-xl border bg-white transition ${
                        active
                          ? 'border-jora-red'
                          : 'border-jora-charcoal/10 hover:border-jora-charcoal/30'
                      }`}
                    >
                      <BagArt
                        variant={product.variant}
                        palette={option.id}
                        className="h-full w-full p-1"
                      />
                      <span className="absolute inset-x-2 bottom-1.5 truncate text-[7px] font-medium uppercase tracking-[0.12em] text-jora-charcoal/55">
                        {option.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="lg:pt-2">
            <p className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-jora-red">
              {category?.label ?? product.category}
              {product.badge && (
                <span className="rounded-full bg-jora-navy/5 px-2 py-0.5 text-[8px] tracking-[0.16em] text-jora-navy/60">
                  {product.badge}
                </span>
              )}
            </p>
            <h1 className="mt-2 font-display text-4xl leading-[1.05] text-jora-charcoal sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <p className="font-display text-2xl text-jora-charcoal">{formatNaira(price)}</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-jora-charcoal/40">
                {size.label} · {size.dimensions}
              </p>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-jora-charcoal/60">
              {description}
            </p>

            <fieldset className="mt-7">
              <legend className="flex w-full items-center justify-between gap-4 border-b border-jora-charcoal/10 pb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-jora-charcoal/45">
                <span>Colour</span>
                <span className="text-jora-charcoal/70">{color.name}</span>
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {colors.map((option) => {
                  const active = option.id === selectedColor
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedColor(option.id)}
                      aria-pressed={active}
                      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] transition ${
                        active
                          ? 'border-jora-red bg-white text-jora-charcoal'
                          : 'border-jora-charcoal/12 text-jora-charcoal/60 hover:border-jora-charcoal/30 hover:text-jora-charcoal'
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-jora-charcoal/15"
                        style={{ backgroundColor: option.hex }}
                      />
                      {option.name}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="flex w-full items-center justify-between gap-4 border-b border-jora-charcoal/10 pb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-jora-charcoal/45">
                <span>Size</span>
                <span className="text-jora-charcoal/70">{size.dimensions}</span>
              </legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {sizes.map((option) => {
                  const active = option.label === selectedSize
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setSelectedSize(option.label)}
                      aria-pressed={active}
                      className={`rounded-xl border p-3 text-left transition ${
                        active
                          ? 'border-jora-red bg-white'
                          : 'border-jora-charcoal/12 hover:border-jora-charcoal/30'
                      }`}
                    >
                      <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-jora-charcoal">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-[9px] text-jora-charcoal/45">
                        {option.dimensions}
                      </span>
                      <span className="mt-2 block text-[10px] text-jora-charcoal/70">
                        {formatNaira(priceFor(product, option.label))}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                label={`Quantity for ${product.name}`}
              />
              <p className="text-[10px] uppercase tracking-[0.12em] text-jora-charcoal/40">
                Usually ships within 48 hours
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={addToBag}
                className="btn-sweep inline-flex items-center justify-center gap-2 rounded-full bg-jora-navy px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                style={{ '--sweep-bg': '#e8185a' }}
              >
                Add to bag
                <ArrowIcon className="h-4 w-4" />
              </button>
              <a
                href={waLink(singleItemMessage(product, selectedColor, selectedSize, quantity))}
                target="_blank"
                rel="noreferrer"
                className="btn-sweep inline-flex items-center justify-center gap-2 rounded-full border border-jora-red px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-jora-red"
                style={{ '--sweep-bg': '#e8185a' }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order this bag
              </a>
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-jora-charcoal/45 underline decoration-jora-charcoal/20 underline-offset-4 transition hover:text-jora-red"
            >
              View your bag
            </button>

            <div className="mt-7 grid grid-cols-3 gap-3 border-y border-jora-charcoal/10 py-4">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <GiftIcon className="h-5 w-5 text-jora-red" />
                <p className="text-[9px] uppercase tracking-[0.1em] text-jora-charcoal/50">
                  Gift wrap
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5 border-x border-jora-charcoal/10 text-center">
                <PinIcon className="h-5 w-5 text-jora-red" />
                <p className="text-[9px] uppercase tracking-[0.1em] text-jora-charcoal/50">
                  Abuja delivery
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <ClockIcon className="h-5 w-5 text-jora-red" />
                <p className="text-[9px] uppercase tracking-[0.1em] text-jora-charcoal/50">
                  Real photos
                </p>
              </div>
            </div>

            <div className="mt-2">
              <details className="group border-b border-jora-charcoal/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/70 [&::-webkit-details-marker]:hidden">
                  Details & dimensions
                  <PlusIcon className="h-4 w-4 text-jora-charcoal/40 transition group-open:rotate-45" />
                </summary>
                <dl className="grid gap-2 pb-5 text-xs sm:grid-cols-2">
                  <div className="flex justify-between gap-4 border-b border-jora-charcoal/5 pb-2 sm:block sm:border-0 sm:pb-0">
                    <dt className="text-jora-charcoal/40">Size</dt>
                    <dd className="text-jora-charcoal/70">
                      {size.label} · {size.dimensions}
                    </dd>
                  </div>
                  {specs.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 border-b border-jora-charcoal/5 pb-2 sm:block sm:border-0 sm:pb-0"
                    >
                      <dt className="text-jora-charcoal/40">{label}</dt>
                      <dd className="text-right text-jora-charcoal/70 sm:text-left">{value}</dd>
                    </div>
                  ))}
                </dl>
              </details>

              <details className="group border-b border-jora-charcoal/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/70 [&::-webkit-details-marker]:hidden">
                  Delivery & payment
                  <PlusIcon className="h-4 w-4 text-jora-charcoal/40 transition group-open:rotate-45" />
                </summary>
                <div className="space-y-2 pb-5 text-xs leading-relaxed text-jora-charcoal/55">
                  <p>
                    Free delivery within Abuja on orders over ₦50,000. Nationwide delivery is
                    arranged on WhatsApp and quoted by location.
                  </p>
                  <p>
                    Payment is confirmed by bank transfer after we check stock and delivery in
                    chat. Every order is packed with care and can be gift wrapped on request.
                  </p>
                </div>
              </details>

              <details className="group border-b border-jora-charcoal/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/70 [&::-webkit-details-marker]:hidden">
                  Care & returns
                  <PlusIcon className="h-4 w-4 text-jora-charcoal/40 transition group-open:rotate-45" />
                </summary>
                <div className="space-y-2 pb-5 text-xs leading-relaxed text-jora-charcoal/55">
                  <p>
                    Store your bag in its dust bag when not in use. Keep it away from prolonged
                    heat and direct sunlight, and wipe gently with a soft dry cloth.
                  </p>
                  <p>
                    Please inspect your order on delivery and raise any concern within 24 hours.
                    Returns are accepted on unused bags in original packaging.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <div className="flex items-end justify-between gap-4 border-b border-jora-charcoal/10 pb-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-jora-red">
                Keep looking
              </p>
              <h2 className="mt-1 font-display text-3xl text-jora-charcoal">You may also like</h2>
            </div>
            <a
              href="#shop"
              onClick={(event) => { event.preventDefault(); onNavigate('shop') }}
              className="hidden items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-jora-red transition hover:text-jora-navy sm:inline-flex"
            >
              All bags
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      </div>
    </div>
  )
}
