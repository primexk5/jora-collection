import OrderButton from '../components/OrderButton'
import BagArt from '../components/BagArt'
import Countdown from '../components/Countdown'
import CurveDivider from '../components/CurveDivider'
import { ArrowIcon, SparkIcon, WhatsAppIcon } from '../components/Icons'
import ProductGrid from '../components/ProductGrid'
import SectionHeading from '../components/SectionHeading'
import { NEW_ARRIVALS } from '../data/products'
import { GENERAL_ORDER_LINK, formatNaira } from '../lib/site'

export default function NewArrivals() {
  const heroProduct = NEW_ARRIVALS[0]

  return (
    <div>
      <section className="relative overflow-hidden bg-jora-navy text-white">
        <div className="shell relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1fr_0.9fr]">
          <div className="anim-left">
            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-jora-gold">
              <SparkIcon className="h-3.5 w-3.5" />
              Limited drop
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              New arrivals.
              <br />
              <span className="text-jora-gold">Here for now.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
              A small, considered drop of new shapes in gold, rose and ink. When the last piece
              sells, the drop closes.
            </p>

            <div className="mt-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.24em] text-white/40">
                Next drop closes in
              </p>
              <Countdown tone="light" />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OrderButton product={heroProduct}
                className="btn-sweep inline-flex items-center justify-center gap-2 rounded-full bg-jora-red px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                style={{ '--sweep-bg': '#c9a66b' }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order the new drop
              </OrderButton>
              <a
                href={GENERAL_ORDER_LINK}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 transition hover:border-white hover:text-white"
              >
                Ask what is left
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="anim-right relative mx-auto w-full max-w-[420px]">
            <div className="float-slow relative aspect-square">
              <div className="hero-ring absolute inset-3 rounded-full border border-dashed border-white/15" />
              <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_70%,transparent)]" />
              <BagArt
                variant={heroProduct.variant}
                palette={heroProduct.palette}
                className="relative h-full w-full p-10"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-jora-red" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                {heroProduct.name} · {formatNaira(heroProduct.price)}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-jora-navy">
          <CurveDivider fill="#ffffff" />
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={`${NEW_ARRIVALS.length} new pieces`}
              title="The full new edit"
              intro="Order on WhatsApp with the bag name pre-filled. Gift wrapping available on request."
            />
            <p className="text-[10px] uppercase tracking-[0.18em] text-jora-charcoal/40">
              Restocks are not guaranteed
            </p>
          </div>
          <div className="mt-10">
            <ProductGrid products={NEW_ARRIVALS} />
          </div>
        </div>
      </section>

      <section className="bg-jora-soft py-14">
        <div className="shell">
          <div className="reveal flex flex-col items-center gap-4 rounded-[2rem] border border-jora-charcoal/8 bg-white px-6 py-10 text-center">
            <p className="font-script text-3xl text-jora-gold">Limited drop</p>
            <h2 className="font-display text-2xl text-jora-charcoal sm:text-3xl">
              Do not wait on the one you love.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-jora-charcoal/55">
              Message us with the style name and we will confirm availability, delivery and gift
              options in one conversation.
            </p>
            <a
              href={GENERAL_ORDER_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-sweep mt-2 inline-flex items-center gap-2 rounded-full bg-jora-red px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
              style={{ '--sweep-bg': '#1b2233' }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
