import BagArt from '../components/BagArt'
import Countdown from '../components/Countdown'
import CurveDivider from '../components/CurveDivider'
import {
  ArrowIcon,
  ClockIcon,
  GiftIcon,
  SparkIcon,
  WhatsAppIcon,
} from '../components/Icons'
import ProductGrid from '../components/ProductGrid'
import SectionHeading from '../components/SectionHeading'
import { CATEGORIES, FEATURED, NEW_ARRIVALS, TESTIMONIALS, VALUES } from '../data/products'
import { GENERAL_ORDER_LINK, SITE, formatNaira } from '../lib/site'

const MARQUEE_ITEMS = [
  ...CATEGORIES.map((category) => category.label),
  'Confidence you carry',
]

export default function Home({ onNavigate, onShopCategory, onOpenQuiz }) {
  return (
    <div>
      <section className="relative overflow-hidden bg-jora-soft">
        <svg
          viewBox="0 0 120 180"
          aria-hidden="true"
          className="draw-j pointer-events-none absolute right-[38%] top-10 hidden w-20 lg:block"
        >
          <path
            d="M92 16v112c0 26-18 44-44 44S4 154 4 130"
            fill="none"
            stroke="#e8185a"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.16"
          />
        </svg>

        <div className="shell relative grid items-center gap-12 py-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 lg:py-20">
          <div className="anim-left">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-jora-red" />
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-jora-charcoal/55">
                JORA Collection · Abuja
              </span>
            </div>

            <p className="mt-6 font-script text-4xl text-jora-gold sm:text-5xl">
              {SITE.tagline}
            </p>

            <h1 className="mt-2 font-display text-[2.7rem] leading-[1.02] text-jora-charcoal sm:text-6xl xl:text-[4.3rem]">
              Every bag.
              <br />
              <span className="text-jora-charcoal/40">Every mood.</span>
              <br />
              One confident <span className="relative text-jora-red">you</span>.
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-jora-charcoal/60">
              Hand-picked bags for work, weekends and everything in between. Tap, chat, and let
              us deliver your next favourite to your door.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={GENERAL_ORDER_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-sweep inline-flex items-center justify-center gap-2 rounded-full bg-jora-red px-7 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                style={{ '--sweep-bg': '#1b2233' }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-jora-charcoal/20 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-jora-charcoal transition hover:border-jora-navy hover:bg-jora-navy hover:text-white"
              >
                Shop the Collection
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              {['Free Abuja delivery over ₦50k', 'Nationwide delivery', 'Gift wrapping'].map(
                (item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-jora-charcoal/50"
                  >
                    <span className="h-1 w-1 rounded-full bg-jora-gold" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="anim-right relative mx-auto w-full max-w-[430px]">
            <div className="float-slow relative aspect-square">
              <div className="absolute inset-0 rounded-full border border-jora-charcoal/10" />
              <div className="hero-ring absolute inset-5 rounded-full border border-dashed border-jora-red/30" />
              <div className="absolute inset-10 rounded-full bg-[radial-gradient(circle_at_50%_38%,#ffffff_0%,#efeff1_62%,#e4e5e8_100%)]" />
              <BagArt
                variant={FEATURED.variant}
                palette={FEATURED.palette}
                className="absolute inset-0 h-full w-full p-12"
              />
              <div className="absolute inset-x-0 bottom-2 flex justify-center">
                <a
                  href={`#bag/${FEATURED.id}`}
                  className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 backdrop-blur transition hover:bg-jora-navy hover:text-white"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-jora-red text-white">
                    <SparkIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="pr-1 text-left">
                    <span className="block text-[9px] uppercase tracking-[0.18em] opacity-50">
                      Featured bag
                    </span>
                    <span className="block text-xs font-medium">{FEATURED.name}</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="float-slower absolute -left-2 top-8 rounded-2xl border border-jora-charcoal/5 bg-white/95 px-4 py-3 backdrop-blur">
              <p className="text-[9px] uppercase tracking-[0.22em] text-jora-charcoal/40">New drop</p>
              <p className="mt-1 font-display text-sm">The Gold Edit</p>
            </div>

            <div className="float-slow absolute -right-1 bottom-16 rounded-2xl border border-jora-charcoal/5 bg-jora-navy px-4 py-3 text-white">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">From</p>
              <p className="mt-1 font-display text-sm">{formatNaira(FEATURED.price)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee overflow-hidden border-y border-white/10 bg-jora-navy py-4 text-white">
        <div className="marquee-track flex w-max">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex items-center gap-8 pr-8"
              aria-hidden={group === 1 ? 'true' : undefined}
            >
              {MARQUEE_ITEMS.map((item) => (
                <span key={`${group}-${item}`} className="flex items-center gap-8">
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/70">
                    {item}
                  </span>
                  <span className="h-1 w-1 rotate-45 bg-jora-red" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-jora-soft py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The collection"
              title={
                <>
                  Shop by mood,
                  <br className="hidden sm:block" /> not by accident.
                </>
              }
              intro="Six shapes, one standard. Find the bag that fits the life you actually live."
            />
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="group inline-flex w-fit items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-jora-red"
            >
              View all bags
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category, index) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onShopCategory(category.id)}
                className="group reveal relative overflow-hidden rounded-[1.75rem] border border-jora-charcoal/8 bg-white p-5 text-left transition duration-500 hover:-translate-y-1 hover:border-jora-red/40"
                style={{ transitionDelay: `${(index % 3) * 90}ms` }}
              >
                <div className="relative mx-auto aspect-square w-full max-w-[190px]">
                  <div className="absolute inset-0 rounded-full border border-jora-charcoal/8" />
                  <div className="absolute inset-4 rounded-full bg-jora-soft" />
                  <BagArt
                    variant={category.variant}
                    palette={category.palette}
                    className="art-grayscale art-sway relative h-full w-full p-1"
                  />
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl text-jora-charcoal">{category.label}</h3>
                    <p className="mt-1 max-w-[15rem] text-xs leading-relaxed text-jora-charcoal/50">
                      {category.note}
                    </p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-jora-charcoal/15 text-jora-charcoal/60 transition group-hover:border-jora-red group-hover:bg-jora-red group-hover:text-white">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Just in"
              title="The new edit"
              intro="Fresh shapes, limited pieces. When they are gone, they are gone."
            />
            <button
              type="button"
              onClick={() => onNavigate('new-arrivals')}
              className="group inline-flex w-fit items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-jora-red"
            >
              Shop new arrivals
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-10">
            <ProductGrid products={NEW_ARRIVALS.slice(0, 4)} />
          </div>
        </div>
      </section>

      <div className="bg-white">
        <CurveDivider fill="#1b2233" />
      </div>
      <section className="relative overflow-hidden bg-jora-navy text-white">
        <div className="shell grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1fr_0.85fr]">
          <div className="reveal">
            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-jora-gold">
              <SparkIcon className="h-3.5 w-3.5" />
              Find your bag
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight sm:text-4xl lg:text-[2.9rem]">
              Three questions. <span className="text-jora-gold">One bag</span> made for you.
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/60">
              Tell us the occasion, your style and your budget. We will point you to the JORA bag
              that fits — no endless scrolling.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenQuiz}
                className="btn-sweep inline-flex items-center gap-2 rounded-full bg-jora-red px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                style={{ '--sweep-bg': '#c9a66b' }}
              >
                Take the quiz
                <ArrowIcon className="h-4 w-4" />
              </button>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                Takes under a minute
              </span>
            </div>
          </div>

          <div className="reveal relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rotate-3 rounded-[2rem] border border-white/10" />
            <div className="relative -rotate-2 rounded-[1.75rem] bg-jora-soft p-5 text-jora-charcoal">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-jora-charcoal/40">
                  Find your bag
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-jora-red">
                  01 / 03
                </span>
              </div>
              <p className="mt-4 font-display text-xl">Where is this bag going?</p>
              <div className="mt-4 space-y-2">
                {['Work & meetings', 'Weekends out', 'Evenings & events'].map((option, index) => (
                  <div
                    key={option}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs ${
                      index === 0
                        ? 'border-jora-red bg-white text-jora-charcoal'
                        : 'border-jora-charcoal/10 bg-white/60 text-jora-charcoal/55'
                    }`}
                  >
                    {option}
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        index === 0 ? 'bg-jora-red' : 'bg-jora-charcoal/20'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-jora-charcoal/10">
                <div className="h-full w-1/3 rounded-full bg-jora-red" />
              </div>
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-2xl bg-jora-gold px-4 py-3 text-jora-charcoal">
              <p className="text-[8px] font-medium uppercase tracking-[0.2em] opacity-60">
                Your match
              </p>
              <p className="mt-0.5 font-display text-sm">Ada Gold Edition</p>
            </div>
          </div>
        </div>

        <div className="bg-jora-navy">
          <CurveDivider fill="#f6f6f7" />
        </div>
      </section>

      <section className="bg-jora-soft py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Confidence Corner"
            title="Worn, loved, repeated."
            intro="Real words from women and men who carry JORA. Send us your photos and we will feature them here."
            align="center"
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <figure
                key={testimonial.name}
                className="reveal flex h-full flex-col rounded-[1.75rem] border border-jora-charcoal/8 bg-white p-6"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="flex gap-1 text-jora-red">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <SparkIcon key={star} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-jora-charcoal/70">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-jora-charcoal/8 pt-4">
                  <p className="text-sm font-medium text-jora-charcoal">{testimonial.name}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-jora-charcoal/40">
                    {testimonial.city} · {testimonial.bag}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The lookbook"
              title={
                <>
                  One bag.
                  <br className="hidden sm:block" /> Every version of you.
                </>
              }
              intro="From boardroom to beach weekend — see how the collection moves through the day."
            />
            <button
              type="button"
              onClick={() => onNavigate('lookbook')}
              className="group inline-flex w-fit items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-jora-red"
            >
              Open the lookbook
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                label: 'Look 01 — Work',
                variant: 'tote',
                palette: 'gold',
                bg: 'bg-jora-navy',
                tone: 'light',
              },
              {
                label: 'Look 02 — Weekend',
                variant: 'crossbody',
                palette: 'red',
                bg: 'bg-[#efe9e2]',
                tone: 'dark',
              },
              {
                label: 'Look 03 — Evening',
                variant: 'clutch',
                palette: 'gold',
                bg: 'bg-jora-charcoal',
                tone: 'light',
              },
            ].map((look, index) => (
              <button
                key={look.label}
                type="button"
                onClick={() => onNavigate('lookbook')}
                className={`group reveal relative overflow-hidden rounded-[1.75rem] ${look.bg} p-5 text-left`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative aspect-[4/5]">
                  <div
                    className={`absolute inset-0 rounded-full border ${
                      look.tone === 'light' ? 'border-white/15' : 'border-jora-charcoal/10'
                    }`}
                  />
                  <BagArt
                    variant={look.variant}
                    palette={look.palette}
                    className="art-sway relative h-full w-full p-4"
                  />
                </div>
                <div
                  className={`mt-3 flex items-center justify-between ${
                    look.tone === 'light' ? 'text-white' : 'text-jora-charcoal'
                  }`}
                >
                  <span
                    className={`text-[9px] font-medium uppercase tracking-[0.2em] ${
                      look.tone === 'light' ? 'text-white/70' : 'text-jora-charcoal/50'
                    }`}
                  >
                    {look.label}
                  </span>
                  <ArrowIcon
                    className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                      look.tone === 'light' ? 'text-white/60' : 'text-jora-charcoal/50'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-jora-soft py-16 md:py-20">
        <div className="shell">
          <div className="grid gap-8 rounded-[2rem] border border-jora-charcoal/8 bg-white p-8 md:grid-cols-3 md:p-10">
            {VALUES.map((value, index) => (
              <div
                key={value.title}
                className="reveal border-jora-charcoal/8 md:border-r md:pr-8 md:last:border-r-0 md:last:pr-0"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="font-display text-sm text-jora-gold">0{index + 1}</span>
                <h3 className="mt-2 font-display text-xl text-jora-charcoal">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-jora-charcoal/55">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <div className="reveal relative overflow-hidden rounded-[2rem] bg-jora-navy px-6 py-12 text-center text-white md:px-14 md:py-16">
            <p className="font-script text-3xl text-jora-gold md:text-4xl">{SITE.tagline}</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl leading-tight md:text-5xl">
              Ready to carry confidence?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60">
              Send us a message and we will help you choose, gift wrap and deliver. Orders are
              confirmed personally on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={GENERAL_ORDER_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-sweep inline-flex items-center gap-2 rounded-full bg-jora-red px-7 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                style={{ '--sweep-bg': '#c9a66b' }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order Now
              </a>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 transition hover:border-white hover:text-white"
              >
                Call {SITE.phoneDisplay}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[9px] uppercase tracking-[0.18em] text-white/40">
              <span className="flex items-center gap-1.5">
                <ClockIcon className="h-3.5 w-3.5 text-jora-gold" />
                {SITE.hours}
              </span>
              <span className="flex items-center gap-1.5">
                <GiftIcon className="h-3.5 w-3.5 text-jora-gold" />
                Gift wrapping available
              </span>
              <span className="flex items-center gap-1.5">
                <SparkIcon className="h-3.5 w-3.5 text-jora-gold" />
                Limited new drop
              </span>
            </div>
            <div className="mt-8 flex justify-center">
              <Countdown tone="light" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
