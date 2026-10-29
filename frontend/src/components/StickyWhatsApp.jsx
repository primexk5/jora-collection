import { GENERAL_ORDER_LINK } from '../lib/site'
import { WhatsAppIcon } from './Icons'

export default function StickyWhatsApp() {
  return (
    <a
      href={GENERAL_ORDER_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with JORA Collection on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25d366] py-3.5 pl-3.5 pr-4 text-white transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
    >
      <span className="grid h-7 w-7 place-items-center">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
      <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  )
}
