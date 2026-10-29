export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className = '',
}) {
  const centered = align === 'center'
  const light = tone === 'light'

  return (
    <div className={`reveal ${centered ? 'mx-auto max-w-2xl text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-jora-red" />
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.28em] ${
              light ? 'text-white/65' : 'text-jora-charcoal/55'
            }`}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`mt-4 font-display text-3xl leading-[1.12] sm:text-4xl lg:text-[2.9rem] ${
          light ? 'text-white' : 'text-jora-charcoal'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-xl text-[15px] leading-relaxed ${centered ? 'mx-auto' : ''} ${
            light ? 'text-white/60' : 'text-jora-charcoal/60'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
