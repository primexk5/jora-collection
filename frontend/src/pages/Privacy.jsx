import { PRIVACY_SECTIONS, PRIVACY_UPDATED } from '../data/privacy'
import { SITE, waLink } from '../lib/site'
import { PhoneIcon, ShieldIcon, WhatsAppIcon } from '../components/Icons'

const TOC = [
  ...PRIVACY_SECTIONS.map((section) => ({ id: section.id, title: section.title })),
  { id: 'privacy-contact', title: 'Contact us' },
]

function scrollToSection(id) {
  const section = document.getElementById(id)
  if (!section) return
  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  section.focus({ preventScroll: true })
}

export default function Privacy({ onNavigate, onOpenSettings }) {
  return (
    <div className="pb-20 pt-6 sm:pt-10">
      <div className="shell">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-jora-charcoal/40"
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="transition hover:text-jora-red"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span>Legal</span>
          <span aria-hidden="true">/</span>
          <span className="text-jora-charcoal/70">Privacy &amp; Cookies</span>
        </nav>

        <header className="anim-up mt-8 grid gap-8 border-b border-jora-charcoal/10 pb-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="font-script text-3xl text-jora-gold">Your data, handled with care.</p>
            <h1 className="mt-2 font-display text-4xl leading-[1.05] text-jora-charcoal sm:text-5xl">
              Privacy &amp; Cookie Policy
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-jora-charcoal/60">
              This policy explains what information JORA Collection collects, why we need it, and
              how we use cookies and local storage. It covers this website and our WhatsApp
              ordering service.
            </p>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/40">
              Last updated · {PRIVACY_UPDATED}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-jora-charcoal/10 bg-white p-5">
            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-jora-red">
              <ShieldIcon className="h-4 w-4" />
              The short version
            </p>
            <ul className="mt-4 space-y-3 text-xs leading-relaxed text-jora-charcoal/60">
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-jora-gold" />
                We only ask for what we need to answer you and deliver your order.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-jora-gold" />
                We do not sell your personal information or use advertising or analytics cookies.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-jora-gold" />
                Your bag and cookie choice stay in your browser unless you clear them.
              </li>
            </ul>
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-jora-charcoal/40">
              On this page
            </p>
            <nav aria-label="Privacy policy sections" className="mt-4 space-y-1">
              {TOC.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full border-l border-jora-charcoal/10 py-1.5 pl-3 text-left text-xs text-jora-charcoal/55 transition hover:border-jora-red hover:text-jora-red"
                >
                  {item.title}
                </button>
              ))}
            </nav>

            <div className="mt-7 rounded-2xl border border-jora-charcoal/10 bg-white p-4">
              <p className="font-display text-lg text-jora-charcoal">Questions?</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-jora-charcoal/50">
                We are happy to explain how your information is used.
              </p>
              <a
                href={waLink('Hi JORA Collection, I have a question about my privacy.')}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-jora-red transition hover:text-jora-navy"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Message us
              </a>
            </div>

            <button
              type="button"
              onClick={onOpenSettings}
              className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-jora-charcoal/40 transition hover:text-jora-red"
            >
              <ShieldIcon className="h-3.5 w-3.5" />
              Cookie settings
            </button>
          </aside>

          <article className="min-w-0 rounded-[1.75rem] border border-jora-charcoal/8 bg-white p-6 sm:p-10">
            {PRIVACY_SECTIONS.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                tabIndex={-1}
                className="scroll-mt-28 border-b border-jora-charcoal/8 pb-8 pt-8 outline-none first:pt-0 last:border-0"
              >
                <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-jora-red">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-1 font-display text-2xl text-jora-charcoal sm:text-3xl">
                  {section.title}
                </h2>
                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-sm leading-relaxed text-jora-charcoal/60"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.points && (
                  <ul className="mt-4 space-y-2.5">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-jora-charcoal/60"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-jora-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {section.after?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-sm leading-relaxed text-jora-charcoal/60"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section
              id="privacy-contact"
              tabIndex={-1}
              className="scroll-mt-28 pt-8 outline-none"
            >
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-jora-red">
                Contact us
              </p>
              <h2 className="mt-1 font-display text-2xl text-jora-charcoal sm:text-3xl">
                Privacy questions and requests
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-jora-charcoal/60">
                To access, correct or delete your information, or to ask a question about this
                policy, reach us on WhatsApp or call during business hours.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href={waLink('Hi JORA Collection, I have a privacy question.')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-jora-charcoal/10 bg-jora-soft px-4 py-3 transition hover:border-jora-red"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-jora-red">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[8px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/40">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block text-sm text-jora-charcoal">
                      {SITE.phoneDisplay}
                    </span>
                  </span>
                </a>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="flex items-center gap-3 rounded-xl border border-jora-charcoal/10 bg-jora-soft px-4 py-3 transition hover:border-jora-red"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-jora-red">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[8px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/40">
                      Call
                    </span>
                    <span className="mt-0.5 block text-sm text-jora-charcoal">
                      {SITE.phoneDisplay}
                    </span>
                  </span>
                </a>
              </div>

              <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-jora-charcoal/40">
                {SITE.name} · {SITE.location} · {SITE.hours}
              </p>

              <button
                type="button"
                onClick={onOpenSettings}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-jora-charcoal/15 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-jora-charcoal/70 transition hover:border-jora-red hover:text-jora-red"
              >
                <ShieldIcon className="h-4 w-4" />
                Review cookie settings
              </button>
            </section>
          </article>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-jora-charcoal/10 pt-6">
          <p className="text-[10px] uppercase tracking-[0.16em] text-jora-charcoal/40">
            {SITE.name} · Privacy &amp; Cookie Policy · {PRIVACY_UPDATED}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-jora-red transition hover:text-jora-navy"
          >
            Back to the shop
          </button>
        </div>
      </div>
    </div>
  )
}
