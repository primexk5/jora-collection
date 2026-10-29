import { useState } from 'react'
import { ArrowIcon, GiftIcon, SparkIcon, WhatsAppIcon } from '../components/Icons'
import ProductGrid from '../components/ProductGrid'
import SectionHeading from '../components/SectionHeading'
import { CATEGORIES, PRODUCTS } from '../data/products'
import useScrollReveal from '../hooks/useScrollReveal'
import { GENERAL_ORDER_LINK, SITE } from '../lib/site'

const INITIAL_VISIBLE = 8

export default function Shop({ category, onCategoryChange, onOpenQuiz }) {
  const [expansion, setExpansion] = useState({ category: null, expanded: false })
  const filtered = category === 'all' ? PRODUCTS : PRODUCTS.filter((item) => item.category === category)
  const activeCategory = CATEGORIES.find((item) => item.id === category)
  const showAll = expansion.category === category && expansion.expanded
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE)
  const hiddenCount = filtered.length - visible.length

  useScrollReveal(`${category}-${showAll}`)

  const changeCategory = (id) => {
    setExpansion({ category: null, expanded: false })
    onCategoryChange(id)
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-jora-soft pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="shell relative">
          <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.22em] text-jora-charcoal/40">
            <span>JORA</span>
            <span className="h-px w-5 bg-jora-charcoal/20" />
            <span>Shop</span>
          </div>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="anim-up">
              <h1 className="font-display text-4xl leading-tight text-jora-charcoal sm:text-5xl">
                {activeCategory ? activeCategory.label : 'The Shop'}
              </h1>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-jora-charcoal/60">
                {activeCategory
                  ? activeCategory.note
                  : 'Every shape in the collection. All prices are in naira, and every order is confirmed personally on WhatsApp.'}
              </p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-jora-charcoal/45">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} available
            </p>
          </div>

          <div className="no-scrollbar -mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-1">
            <button
              type="button"
              onClick={() => changeCategory('all')}
              aria-pressed={category === 'all'}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] transition ${
                category === 'all'
                  ? 'border-jora-navy bg-jora-navy text-white'
                  : 'border-jora-charcoal/15 bg-white text-jora-charcoal/60 hover:border-jora-red hover:text-jora-red'
              }`}
            >
              All bags
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => changeCategory(item.id)}
                aria-pressed={category === item.id}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] transition ${
                  category === item.id
                    ? 'border-jora-navy bg-jora-navy text-white'
                    : 'border-jora-charcoal/15 bg-white text-jora-charcoal/60 hover:border-jora-red hover:text-jora-red'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14">
        <div className="shell">
          {filtered.length > 0 ? (
            <div id="shop-products">
              <ProductGrid products={visible} />
              {hiddenCount > 0 && (
                <div className="mt-10 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setExpansion({ category, expanded: true })}
                    aria-expanded={false}
                    aria-controls="shop-products"
                    className="btn-sweep inline-flex items-center gap-2 rounded-full bg-jora-navy px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white"
                    style={{ '--sweep-bg': '#e8185a' }}
                  >
                    See more bags
                    <ArrowIcon className="h-4 w-4 rotate-90" />
                  </button>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-jora-charcoal/40">
                    {hiddenCount} more {hiddenCount === 1 ? 'piece' : 'pieces'} in this edit
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-jora-charcoal/10 bg-jora-soft px-6 py-16 text-center">
              <p className="font-display text-2xl text-jora-charcoal">Nothing here yet.</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-jora-charcoal/55">
                This shape is restocking. Message us on WhatsApp and we will let you know the
                moment it lands.
              </p>
              <a
                href={GENERAL_ORDER_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-jora-red px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ask about restock
              </a>
            </div>
          )}

          <div className="mt-12 grid gap-4 rounded-[1.75rem] border border-jora-charcoal/8 bg-jora-soft p-6 sm:grid-cols-3 sm:p-8">
            {[
              {
                icon: WhatsAppIcon,
                title: 'Order on WhatsApp',
                body: 'Your bag name and price are pre-filled. Just send.',
              },
              {
                icon: GiftIcon,
                title: 'Gift wrapping',
                body: 'Tell us it is a gift and we will wrap it with care.',
              },
              {
                icon: SparkIcon,
                title: `${SITE.freeDeliveryNote}`,
                body: 'Nationwide delivery available, tracked on WhatsApp.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-jora-red">
                  <item.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h2 className="text-sm font-medium text-jora-charcoal">{item.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-jora-charcoal/50">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-14 md:pb-20">
        <div className="shell">
          <div className="bg-jora-navy px-6 py-10 text-white sm:px-10 md:py-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <SectionHeading
                eyebrow="Not sure?"
                title="Let the quiz choose for you."
                intro="Three quick questions and we will match you with the bag that fits your day, style and budget."
                tone="light"
              />
              <button
                type="button"
                onClick={onOpenQuiz}
                className="btn-sweep inline-flex shrink-0 items-center gap-2 rounded-full bg-jora-red px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                style={{ '--sweep-bg': '#c9a66b' }}
              >
                Find my bag
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
