export default function Logo({ tone = 'dark', compact = false, className = '' }) {
  const dark = tone === 'dark'
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span
        className={`grid h-10 w-10 place-items-center rounded-full border ${
          dark ? 'border-jora-charcoal/15 bg-white/70' : 'border-white/25 bg-white/5'
        }`}
      >
        <span className="font-display text-2xl leading-none text-jora-red">J</span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display tracking-[0.18em] ${
            dark ? 'text-jora-charcoal' : 'text-white'
          } ${compact ? 'text-lg' : 'text-xl'}`}
        >
          JORA
        </span>
        <span
          className={`mt-1 text-[8px] font-medium tracking-[0.46em] ${
            dark ? 'text-jora-charcoal/55' : 'text-white/60'
          }`}
        >
          COLLECTION
        </span>
      </span>
    </span>
  )
}
