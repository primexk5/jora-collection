import { CheckIcon, CloseIcon } from './Icons'

export default function Toast({ message, onViewCart, onDismiss }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="anim-toast fixed bottom-6 left-4 right-4 z-50 flex items-center gap-3 rounded-2xl bg-jora-navy px-4 py-3 text-white sm:right-auto sm:max-w-sm"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-jora-red text-white">
        <CheckIcon className="h-4 w-4" />
      </span>
      <p className="flex-1 text-xs leading-snug">{message}</p>
      <button
        type="button"
        onClick={onViewCart}
        className="shrink-0 text-[9px] font-medium uppercase tracking-[0.16em] text-jora-gold transition hover:text-white"
      >
        View bag
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 rounded-full p-1 text-white/50 transition hover:text-white"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
