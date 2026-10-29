import { useEffect, useState } from 'react'

function nextDrop() {
  const now = new Date()
  const target = new Date(now)
  const daysUntilFriday = (5 - now.getDay() + 7) % 7
  target.setDate(now.getDate() + daysUntilFriday)
  target.setHours(18, 0, 0, 0)
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7)
  }
  return target
}

const pad = (value) => String(value).padStart(2, '0')

export default function Countdown({ tone = 'dark', className = '' }) {
  const [target] = useState(() => nextDrop())
  const [remaining, setRemaining] = useState(() => Math.max(0, target.getTime() - Date.now()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining(Math.max(0, target.getTime() - Date.now()))
    }, 1000)
    return () => window.clearInterval(id)
  }, [target])

  const totalSeconds = Math.floor(remaining / 1000)
  const units = [
    { label: 'Days', value: Math.floor(totalSeconds / 86400) },
    { label: 'Hrs', value: Math.floor((totalSeconds % 86400) / 3600) },
    { label: 'Min', value: Math.floor((totalSeconds % 3600) / 60) },
    { label: 'Sec', value: totalSeconds % 60 },
  ]

  const light = tone === 'light'

  return (
    <div className={`flex gap-2 ${className}`}>
      {units.map((unit) => (
        <div
          key={unit.label}
          className={`min-w-[3.6rem] rounded-xl border px-3 py-2 text-center ${
            light ? 'border-white/15 bg-white/5' : 'border-jora-charcoal/10 bg-white'
          }`}
        >
          <span
            className={`block font-display text-2xl tabular-nums ${
              light ? 'text-white' : 'text-jora-charcoal'
            }`}
          >
            {pad(unit.value)}
          </span>
          <span
            className={`mt-0.5 block text-[8px] font-medium uppercase tracking-[0.2em] ${
              light ? 'text-white/50' : 'text-jora-charcoal/45'
            }`}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
