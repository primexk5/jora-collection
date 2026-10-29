import { CATEGORIES } from '../data/products'
import { GENERAL_ORDER_LINK, NAV, SITE, waLink } from '../lib/site'
import CurveDivider from './CurveDivider'
import { ArrowIcon, PhoneIcon, PinIcon, SocialIcon, WhatsAppIcon } from './Icons'
import Logo from './Logo'

const YEAR = new Date().getFullYear()

export default function Footer({ onNavigate, onShopCategory, onOpenPrivacy }) {
  return (
    <footer className="relative">
      <div className="bg-jora-soft">
        <CurveDivider fill="#1a1a1a" />
      </div>
      <div className="bg-jora-charcoal text-white">
        <div className="shell pb-28 pt-4 md:pt-8">
          <div className="flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-script text-3xl text-jora-gold">{SITE.tagline}</p>
              <h2 className="mt-2 max-w-xl font-display text-3xl leading-tight sm:text-4xl">
                Let&apos;s find your next bag.
              </h2>
            </div>
            <a
              href={GENERAL_ORDER_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-sweep inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
              style={{ '--sweep-bg': '#e8185a' }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo tone="light" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                Hand-picked bags for work, weekends and everything in between. Curated in Abuja,
                delivered across Nigeria.
              </p>
              <div className="mt-5 flex gap-2">
                {SITE.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-jora-red hover:bg-jora-red hover:text-white"
                  >
                    <SocialIcon name={social.label} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-jora-gold">Shop</h3>
              <ul className="mt-4 space-y-2.5">
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => onShopCategory(category.id)}
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-jora-gold">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-jora-gold">
                Contact
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                <li>
                  <a
                    href={waLink('Hi JORA Collection, I have a question.')}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 transition hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-jora-gold" />
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="flex items-center gap-2.5 transition hover:text-white"
                  >
                    <PhoneIcon className="h-4 w-4 text-jora-gold" />
                    Call us
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <PinIcon className="h-4 w-4 text-jora-gold" />
                  {SITE.location}
                </li>
                <li className="pl-6 text-white/45">{SITE.hours}</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.14em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {YEAR} {SITE.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-jora-gold/80">{SITE.tagline}</span>
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="transition hover:text-white"
              >
                Privacy &amp; Cookies
              </button>
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="transition hover:text-white"
              >
                Cookie settings
              </button>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="transition hover:text-white"
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
