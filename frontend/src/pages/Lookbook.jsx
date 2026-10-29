import BagArt from '../components/BagArt'
import CurveDivider from '../components/CurveDivider'
import { ArrowIcon, SparkIcon, WhatsAppIcon } from '../components/Icons'
import SectionHeading from '../components/SectionHeading'
import { GENERAL_ORDER_LINK } from '../lib/site'

const LOOKS = [
  {
    label: 'Look 01 — Work',
    title: 'The 9am to 9pm carry.',
    note: 'Zara Soft Tote · Ada Top Handle',
    variant: 'tote',
    palette: 'gold',
    className: 'md:col-span-2',
    aspect: 'aspect-[16/10]',
    bg: 'bg-jora-navy',
    tone: 'light',
  },
  {
    label: 'Look 02 — Weekend',
    title: 'Ease, off the clock.',
    note: 'Nkem Structured',
    variant: 'handbag',
    palette: 'noir',
    className: '',
    aspect: 'aspect-[4/5]',
    bg: 'bg-[#efe9e2]',
    tone: 'dark',
  },
  {
    label: 'Look 03 — Street',
    title: 'A little red, a lot of nerve.',
    note: 'Bisi Mini',
    variant: 'crossbody',
    palette: 'red',
    className: '',
    aspect: 'aspect-[4/5]',
    bg: 'bg-white',
    tone: 'dark',
  },
  {
    label: 'Look 04 — Evening',
    title: 'Dinner, then wherever.',
    note: 'Ife Clutch',
    variant: 'clutch',
    palette: 'gold',
    className: 'md:col-span-2',
    aspect: 'aspect-[16/10]',
    bg: 'bg-jora-charcoal',
    tone: 'light',
  },
  {
    label: 'Look 05 — Travel',
    title: 'Cabin bag, clear mind.',
    note: 'Tola Cabin Duffel',
    variant: 'travel',
    palette: 'silver',
    className: 'md:col-span-2',
    aspect: 'aspect-[16/10]',
    bg: 'bg-[#e7e4dd]',
    tone: 'dark',
  },
  {
    label: 'Look 06 — Sunday',
    title: 'Softness, structured.',
    note: 'Kemi Day Pack · Zara Soft Tote',
    variant: 'backpack',
    palette: 'cream',
    className: '',
    aspect: 'aspect-[4/5]',
    bg: 'bg-jora-red',
    tone: 'light',
  },
]

const NOTES = [
  {
    title: 'One bag, three ways',
    body: 'A structured top handle works for meetings, church and dinner. Change the strap, change the mood.',
  },
  {
    title: 'Keep the palette tight',
    body: 'Black, navy, cream and one pop of red. The bag should feel like it was always part of the outfit.',
  },
  {
    title: 'Finish with gold',
    body: 'A small gold detail — hardware, clasp or chain — lifts an everyday look without trying too hard.',
  },
]

export default function Lookbook({ onNavigate }) {
  return (
    <div>
      <section className="relative overflow-hidden bg-jora-soft pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="shell relative">
          <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.22em] text-jora-charcoal/40">
            <span>JORA</span>
            <span className="h-px w-5 bg-jora-charcoal/20" />
            <span>Lookbook</span>
          </div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="anim-up">
              <h1 className="font-display text-4xl leading-[1.05] text-jora-charcoal sm:text-5xl lg:text-6xl">
                One bag.
                <br />
                <span className="text-jora-charcoal/40">Every version of you.</span>
              </h1>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-jora-charcoal/60">
              A study in how the collection moves from boardroom to weekend. Black and white
              moods, with one deliberate pop of red.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 pt-4 md:pb-24">
        <div className="shell">
          <div className="grid gap-4 md:grid-cols-3">
            {LOOKS.map((look, index) => {
              const light = look.tone === 'light'
              return (
                <article
                  key={look.label}
                  className={`group reveal relative overflow-hidden rounded-[1.75rem] ${look.bg} ${look.aspect} ${look.className}`}
                  style={{ transitionDelay: `${(index % 3) * 80}ms` }}
                >
                  <div
                    className={`absolute inset-6 rounded-full border ${
                      light ? 'border-white/15' : 'border-jora-charcoal/10'
                    }`}
                  />
                  <BagArt
                    variant={look.variant}
                    palette={look.palette}
                    className="art-sway absolute inset-0 h-full w-full p-8"
                  />
                  <div
                    className={`absolute inset-0 ${
                      light
                        ? 'bg-gradient-to-t from-black/45 via-black/0 to-transparent'
                        : 'bg-gradient-to-t from-white/85 via-white/0 to-transparent'
                    }`}
                  />
                  <span
                    className={`absolute left-5 top-5 grid h-8 w-8 place-items-center rounded-full text-[9px] font-medium tracking-[0.06em] ${
                      light ? 'bg-white/10 text-white' : 'bg-jora-charcoal text-white'
                    } backdrop-blur`}
                  >
                    0{index + 1}
                  </span>
                  <div
                    className={`absolute inset-x-5 bottom-5 ${
                      light ? 'text-white' : 'text-jora-charcoal'
                    }`}
                  >
                    <p className="text-[9px] font-medium uppercase tracking-[0.24em] opacity-60">
                      {look.label}
                    </p>
                    <h2 className="mt-1 font-display text-xl leading-snug sm:text-2xl">
                      {look.title}
                    </h2>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] opacity-55">
                      {look.note}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <div className="bg-white">
        <CurveDivider fill="#f6f6f7" />
      </div>
      <section className="bg-jora-soft py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Style notes"
            title="Carry it like you mean it."
            intro="Three small rules we come back to when styling the collection."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {NOTES.map((note, index) => (
              <div
                key={note.title}
                className="reveal rounded-[1.5rem] border border-jora-charcoal/8 bg-white p-6"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-jora-red/8 text-jora-red">
                  <SparkIcon className="h-4 w-4" />
                </span>
                <h3 className="mt-4 font-display text-xl text-jora-charcoal">{note.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-jora-charcoal/55">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-jora-soft pb-16 md:pb-24">
        <div className="shell">
          <div className="reveal flex flex-col items-center gap-4 rounded-[2rem] bg-jora-navy px-6 py-12 text-center text-white">
            <p className="font-script text-3xl text-jora-gold">Seen something you love?</p>
            <h2 className="max-w-lg font-display text-2xl leading-snug sm:text-3xl">
              Every look in this book can be ordered today.
            </h2>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <a
                href={GENERAL_ORDER_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-sweep inline-flex items-center justify-center gap-2 rounded-full bg-jora-red px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
                style={{ '--sweep-bg': '#c9a66b' }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 transition hover:border-white hover:text-white"
              >
                Shop the collection
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
