import OrderButton from '../components/OrderButton'
import BagArt from '../components/BagArt'
import CurveDivider from '../components/CurveDivider'
import { ArrowIcon, GiftIcon, SparkIcon, WhatsAppIcon } from '../components/Icons'
import SectionHeading from '../components/SectionHeading'
import { FEATURED, VALUES } from '../data/products'
import { GENERAL_ORDER_LINK, SITE } from '../lib/site'

const STEPS = [
  {
    title: 'Browse the edit',
    body: 'Pick a shape from the shop or let the three-question quiz narrow it down for you.',
  },
  {
    title: 'Chat with us',
    body: 'Message on WhatsApp with the bag name pre-filled. We confirm availability, price and delivery.',
  },
  {
    title: 'Delivered with detail',
    body: 'Gift wrap, tracking and delivery updates are handled personally until the bag is in your hands.',
  },
]

export default function About({ onNavigate }) {
  return (
    <div>
      <section className="relative overflow-hidden bg-jora-soft pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="anim-up">
            <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.22em] text-jora-charcoal/40">
              <span>JORA</span>
              <span className="h-px w-5 bg-jora-charcoal/20" />
              <span>About</span>
            </div>
            <p className="mt-6 font-script text-4xl text-jora-gold">{SITE.tagline}</p>
            <h1 className="mt-2 max-w-xl font-display text-4xl leading-[1.05] text-jora-charcoal sm:text-5xl lg:text-6xl">
              A bag should feel like a <span className="text-jora-red">yes.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-jora-charcoal/60">
              JORA Collection began with a simple idea: the right bag does not just carry your
              things — it changes how you walk into the room.
            </p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-jora-charcoal/60">
              We curate a tight edit of shapes that work hard, look expensive and feel like you.
              No endless catalogue. Just the pieces we would carry ourselves, delivered with
              care from Abuja.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="btn-sweep inline-flex items-center justify-center gap-2 rounded-full bg-jora-red px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                style={{ '--sweep-bg': '#1b2233' }}
              >
                Shop the collection
                <ArrowIcon className="h-4 w-4" />
              </button>
              <a
                href={GENERAL_ORDER_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-jora-charcoal/20 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-jora-charcoal transition hover:border-jora-navy hover:bg-jora-navy hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Say hello
              </a>
            </div>
          </div>

          <div className="anim-right relative mx-auto w-full max-w-[430px]">
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-full border border-jora-charcoal/10" />
              <div className="hero-ring absolute inset-5 rounded-full border border-dashed border-jora-gold/50" />
              <div className="absolute inset-9 rounded-full bg-[radial-gradient(circle_at_50%_35%,#ffffff,#ececee)]" />
              <BagArt
                variant={FEATURED.variant}
                palette={FEATURED.palette}
                className="relative h-full w-full p-12"
              />
            </div>
            <div className="absolute -left-2 top-10 rounded-2xl border border-jora-charcoal/5 bg-white/95 px-4 py-3 backdrop-blur">
              <p className="text-[8px] uppercase tracking-[0.22em] text-jora-charcoal/40">
                Curated in
              </p>
              <p className="mt-1 font-display text-sm">Abuja, Nigeria</p>
            </div>
            <OrderButton product={FEATURED}
              className="absolute -bottom-2 right-0 flex items-center gap-2 rounded-full bg-jora-navy px-4 py-3 text-white transition hover:bg-jora-red"
            >
              <SparkIcon className="h-4 w-4 text-jora-gold" />
              <span className="text-[10px] uppercase tracking-[0.16em]">{FEATURED.name}</span>
            </OrderButton>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="What we stand for"
              title="Considered, confident, personal."
              intro="Three things we refuse to compromise on, from the first pick to the final delivery."
            />
            <p className="max-w-xs text-[10px] uppercase leading-relaxed tracking-[0.18em] text-jora-charcoal/40">
              Small edit · Big standards
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <div
                key={value.title}
                className="reveal rounded-[1.75rem] border border-jora-charcoal/8 bg-jora-soft p-7"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="font-display text-2xl text-jora-gold">0{index + 1}</span>
                <h2 className="mt-3 font-display text-2xl text-jora-charcoal">{value.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-jora-charcoal/55">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white">
        <CurveDivider fill="#1b2233" />
      </div>
      <section className="bg-jora-navy text-white">
        <div className="shell py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="reveal">
              <p className="font-script text-3xl text-jora-gold">How it works</p>
              <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
                From scroll to
                <br /> doorstep.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
                No checkout maze. A real person confirms your bag, payment and delivery on
                WhatsApp.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="reveal rounded-2xl border border-white/10 bg-white/5 p-5"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-jora-gold">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 font-display text-lg">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-8 text-[10px] uppercase tracking-[0.18em] text-white/45">
            <span className="flex items-center gap-2">
              <SparkIcon className="h-3.5 w-3.5 text-jora-gold" /> 6 considered shapes
            </span>
            <span className="flex items-center gap-2">
              <WhatsAppIcon className="h-3.5 w-3.5 text-jora-gold" /> 1:1 ordering on WhatsApp
            </span>
            <span className="flex items-center gap-2">
              <GiftIcon className="h-3.5 w-3.5 text-jora-gold" /> Gift wrapping on request
            </span>
            <span className="flex items-center gap-2">
              <SparkIcon className="h-3.5 w-3.5 text-jora-gold" /> Nationwide delivery
            </span>
          </div>
        </div>
        <div className="bg-jora-navy">
          <CurveDivider fill="#f6f6f7" />
        </div>
      </section>

      <section className="bg-jora-soft py-16 md:py-20">
        <div className="shell">
          <div className="reveal flex flex-col items-center gap-4 rounded-[2rem] border border-jora-charcoal/8 bg-white px-6 py-12 text-center">
            <p className="font-script text-3xl text-jora-gold">Your next bag is waiting</p>
            <h2 className="max-w-lg font-display text-2xl leading-snug text-jora-charcoal sm:text-3xl">
              Let us help you choose the one you will carry everywhere.
            </h2>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <a
                href={GENERAL_ORDER_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-sweep inline-flex items-center justify-center gap-2 rounded-full bg-jora-red px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                style={{ '--sweep-bg': '#1b2233' }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-jora-charcoal/15 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-jora-charcoal transition hover:border-jora-navy hover:bg-jora-navy hover:text-white"
              >
                Order / Contact
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
