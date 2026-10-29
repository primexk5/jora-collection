import { useEffect } from 'react'
import { CloseIcon, ShieldIcon } from './Icons'

export const PRIVACY_ACK_KEY = 'jora-privacy-ack-v1'

export default function PrivacyPopup({ open, onAccept, onReadPolicy }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onAccept()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onAccept])

  if (!open) return null

  return (
    <div
      role="region"
      aria-labelledby="privacy-popup-title"
      aria-live="polite"
      className="anim-toast fixed bottom-24 left-4 right-4 z-[45] rounded-2xl border border-jora-charcoal/12 bg-white p-5 sm:left-auto sm:right-7 sm:bottom-24 sm:max-w-sm"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-jora-red/10 text-jora-red">
          <ShieldIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-jora-red">
            Privacy &amp; cookies
          </p>
          <h2
            id="privacy-popup-title"
            className="mt-1 font-display text-xl leading-tight text-jora-charcoal"
          >
            Your privacy, your choice.
          </h2>
        </div>
        <button
          type="button"
          onClick={onAccept}
          aria-label="Close privacy notice"
          className="shrink-0 rounded-full p-1.5 text-jora-charcoal/40 transition hover:bg-jora-red/10 hover:text-jora-red"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-jora-charcoal/60">
        We use essential local storage to remember your bag and this choice. We do not use
        advertising, analytics or tracking cookies. Orders and messages continue on WhatsApp.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="button"
          onClick={onAccept}
          className="btn-sweep rounded-full bg-jora-navy px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white"
          style={{ '--sweep-bg': '#e8185a' }}
        >
          Accept
        </button>
        <button
          type="button"
          onClick={onReadPolicy}
          className="text-[10px] font-medium uppercase tracking-[0.14em] text-jora-charcoal/55 underline decoration-jora-charcoal/20 underline-offset-4 transition hover:text-jora-red"
        >
          Read privacy &amp; cookies policy
        </button>
      </div>
    </div>
  )
}
