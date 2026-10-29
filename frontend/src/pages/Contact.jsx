import { useState } from 'react'
import CurveDivider from '../components/CurveDivider'
import CustomSelect from '../components/CustomSelect'
import {
  ArrowIcon,
  ClockIcon,
  GiftIcon,
  PhoneIcon,
  PinIcon,
  SocialIcon,
  SparkIcon,
  WhatsAppIcon,
} from '../components/Icons'
import SectionHeading from '../components/SectionHeading'
import { PRODUCTS } from '../data/products'
import { SITE, formatNaira, waLink } from '../lib/site'

const FAQS = [
  {
    question: 'How do I place an order?',
    answer:
      'Choose a bag, then tap any “Order on WhatsApp” link. Your message opens with the bag name and price already filled in — send it and we will confirm availability, payment and delivery.',
  },
  {
    question: 'Do you deliver outside Abuja?',
    answer:
      'Yes. Delivery is available nationwide. Abuja orders over ₦50,000 are delivered free; other locations are quoted on WhatsApp before you pay.',
  },
  {
    question: 'Can you gift wrap my order?',
    answer:
      'Absolutely. Tell us it is a gift and we will wrap it with care, add a handwritten note if you like, and keep the price off the package.',
  },
  {
    question: 'Are the bag images exactly what I will receive?',
    answer:
      'The illustrations on this site are a brand preview. Before payment we send real photos and a short video of the exact bag on WhatsApp, so you know precisely what is arriving.',
  },
  {
    question: 'How do I track my delivery?',
    answer:
      'Once your order is dispatched we share the dispatch details and delivery updates directly on WhatsApp until it reaches you.',
  },
]

const inputClass =
  'w-full rounded-xl border border-jora-charcoal/15 bg-white px-4 py-3 text-sm text-jora-charcoal outline-none transition placeholder:text-jora-charcoal/30 focus:border-jora-red'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    bag: 'Not sure yet — help me choose',
    note: '',
  })

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submit = (event) => {
    event.preventDefault()
    const lines = [
      `Hi JORA Collection, my name is ${form.name}.`,
      form.bag.startsWith('Not sure')
        ? 'I would like help choosing a bag.'
        : `I would like to order the ${form.bag}.`,
      form.note ? `Note: ${form.note}` : '',
      `My phone number is ${form.phone}.`,
    ].filter(Boolean)
    window.open(waLink(lines.join(' ')), '_blank', 'noopener,noreferrer')
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-jora-soft pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="shell relative">
          <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.22em] text-jora-charcoal/40">
            <span>JORA</span>
            <span className="h-px w-5 bg-jora-charcoal/20" />
            <span>Order / Contact</span>
          </div>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="anim-up">
              <p className="font-script text-4xl text-jora-gold">Let&apos;s talk bags</p>
              <h1 className="mt-1 font-display text-4xl leading-tight text-jora-charcoal sm:text-5xl">
                Order in one conversation.
              </h1>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-jora-charcoal/60">
              Tell us what you are looking for, or send the pre-filled message from any bag. A real
              person replies with availability, real photos and delivery details.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={submit}
            className="reveal rounded-[2rem] border border-jora-charcoal/8 bg-jora-soft p-6 sm:p-8"
          >
            <h2 className="font-display text-2xl text-jora-charcoal">Send your order</h2>
            <p className="mt-1.5 text-sm text-jora-charcoal/55">
              This opens WhatsApp with your message ready to send.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/50">
                  Your name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  autoComplete="name"
                  placeholder="First and last name"
                  className={inputClass}
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/50">
                  Phone number
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="0706 337 4333"
                  className={inputClass}
                />
              </label>

              <div className="sm:col-span-2">
                <CustomSelect
                  label="Which bag?"
                  name="bag"
                  value={form.bag}
                  onChange={(bag) => setForm((current) => ({ ...current, bag }))}
                  options={[
                    { value: 'Not sure yet — help me choose', label: 'Not sure yet — help me choose' },
                    ...PRODUCTS.map((product) => ({
                      value: product.name,
                      label: product.name,
                      detail: formatNaira(product.price),
                    })),
                  ]}
                />
              </div>

              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/50">
                  Anything else? <span className="normal-case tracking-normal text-jora-charcoal/35">(optional)</span>
                </span>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={update}
                  rows="4"
                  placeholder="Gift wrapping, delivery area, a question about a style..."
                  className={`${inputClass} resize-none`}
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn-sweep mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-jora-red px-6 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white sm:w-auto"
              style={{ '--sweep-bg': '#1b2233' }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Send on WhatsApp
            </button>
            <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-jora-charcoal/35">
              No payment is taken on this website
            </p>
          </form>

          <div className="reveal space-y-4" style={{ transitionDelay: '80ms' }}>
            <a
              href={waLink('Hi JORA Collection, I would like to place an order.')}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-[1.5rem] bg-jora-navy p-6 text-white transition hover:bg-jora-charcoal"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/50">
                    Fastest way to order
                  </p>
                  <p className="mt-1 font-display text-xl">{SITE.phoneDisplay}</p>
                </div>
              </div>
              <ArrowIcon className="h-5 w-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
            </a>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="group rounded-[1.5rem] border border-jora-charcoal/8 bg-jora-soft p-5 transition hover:border-jora-red/40 hover:bg-white"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-jora-red">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-jora-charcoal/40">
                  Call us
                </p>
                <p className="mt-1 font-display text-lg text-jora-charcoal">{SITE.phoneDisplay}</p>
              </a>

              <div className="rounded-[1.5rem] border border-jora-charcoal/8 bg-jora-soft p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-jora-gold">
                  <PinIcon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-jora-charcoal/40">
                  Based in
                </p>
                <p className="mt-1 font-display text-lg text-jora-charcoal">{SITE.location}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-jora-charcoal/8 bg-jora-soft p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-jora-navy">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-jora-charcoal/40">
                  Opening hours
                </p>
                <p className="mt-1 font-display text-lg text-jora-charcoal">{SITE.hours}</p>
              </div>

              <div className="rounded-[1.5rem] border border-jora-charcoal/8 bg-jora-soft p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-jora-gold">
                  <GiftIcon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-jora-charcoal/40">
                  Gift service
                </p>
                <p className="mt-1 font-display text-lg text-jora-charcoal">Wrap &amp; note</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-jora-charcoal/8 bg-white p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/45">
                Follow the collection
              </p>
              <div className="flex gap-2">
                {SITE.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-jora-charcoal/15 text-jora-charcoal/60 transition hover:border-jora-red hover:bg-jora-red hover:text-white"
                  >
                    <SocialIcon name={social.label} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <CurveDivider fill="#f6f6f7" />
      </div>
      <section className="bg-jora-soft py-14 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Good to know"
            title="Questions, answered."
            intro="Still unsure about something? Send a WhatsApp message — we would rather answer than have you guess."
            align="center"
          />
          <div className="mx-auto mt-8 max-w-3xl">
            {FAQS.map((faq, index) => (
              <details
                key={faq.question}
                className="group reveal border-b border-jora-charcoal/10"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                  <span className="flex items-center gap-3 text-sm font-medium text-jora-charcoal">
                    <span className="text-[10px] tracking-[0.16em] text-jora-gold">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-jora-charcoal/15 text-jora-charcoal/60 transition group-open:rotate-45 group-open:border-jora-red group-open:bg-jora-red group-open:text-white">
                    <SparkIcon className="h-3.5 w-3.5" />
                  </span>
                </summary>
                <p className="pb-5 pl-8 pr-10 text-sm leading-relaxed text-jora-charcoal/55">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
