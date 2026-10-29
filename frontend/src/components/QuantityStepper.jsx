import { MinusIcon, PlusIcon } from './Icons'

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  size = 'md',
  label = 'Quantity',
}) {
  const small = size === 'sm'
  const buttonClass = `${small ? 'h-8 w-8' : 'h-11 w-11'} grid place-items-center text-jora-charcoal/60 transition hover:text-jora-red disabled:cursor-not-allowed disabled:opacity-25`

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-jora-charcoal/15 bg-white"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={buttonClass}
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
      <span
        aria-live="polite"
        className={`text-center font-medium tabular-nums text-jora-charcoal ${
          small ? 'min-w-7 text-xs' : 'min-w-9 text-sm'
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={buttonClass}
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
