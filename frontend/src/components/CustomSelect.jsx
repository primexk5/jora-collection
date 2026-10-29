import { useEffect, useId, useRef, useState } from 'react'

export default function CustomSelect({ label, name, value, options, onChange }) {
  const id = useId()
  const root = useRef(null)
  const trigger = useRef(null)
  const search = useRef({ text: '', time: 0 })
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const selected = options.findIndex((option) => option.value === value)

  useEffect(() => {
    if (!open) return
    const dismiss = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open])

  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [open, active, id])

  const choose = (index) => {
    onChange(options[index].value)
    setOpen(false)
    trigger.current?.focus()
  }

  const handleKeyDown = (event) => {
    const index = open ? active : Math.max(0, selected)
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      setOpen(true)
      setActive(event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1
        : !open ? index : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open) choose(active)
      else { setActive(index); setOpen(true) }
    } else if (event.key === 'Escape') {
      if (open) { event.preventDefault(); event.stopPropagation(); setOpen(false) }
    } else if (event.key === 'Tab') {
      setOpen(false)
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault()
      const now = Date.now()
      search.current.text = (now - search.current.time > 700 ? '' : search.current.text) + event.key.toLowerCase()
      search.current.time = now
      const match = options.findIndex((option) => option.label.toLowerCase().startsWith(search.current.text))
      if (match !== -1) { setActive(match); setOpen(true) }
    }
  }

  return (
    <div ref={root} className="relative" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}>
      <label id={`${id}-label`} htmlFor={id} className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-jora-charcoal/50">
        {label}
      </label>
      <input type="hidden" name={name} value={value} />
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-labelledby={`${id}-label`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onKeyDown={handleKeyDown}
        onClick={() => { setActive(Math.max(0, selected)); setOpen(!open) }}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-sm text-jora-charcoal outline-none transition focus-visible:border-jora-red focus-visible:ring-2 focus-visible:ring-jora-red/15 ${open ? 'border-jora-red ring-2 ring-jora-red/10' : 'border-jora-charcoal/15 hover:border-jora-red/50'}`}
      >
        <span className="min-w-0">
          {options[selected]?.label}
          {options[selected]?.detail && <span className="ml-2 text-jora-charcoal/50">— {options[selected].detail}</span>}
        </span>
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 shrink-0 text-jora-red transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul id={`${id}-listbox`} role="listbox" aria-labelledby={`${id}-label`} className="absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-2xl border border-jora-charcoal/10 bg-white p-1.5 shadow-xl shadow-jora-charcoal/10">
          {options.map((option, index) => (
            <li key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={value === option.value}
              onPointerDown={(event) => event.preventDefault()}
              onPointerMove={() => setActive(index)}
              onClick={() => choose(index)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${active === index ? 'bg-jora-soft' : ''} ${value === option.value ? 'text-jora-red' : 'text-jora-charcoal'}`}>
              <span className="min-w-0 flex-1">{option.label}{option.detail && <span className="mt-0.5 block text-xs text-jora-charcoal/50">{option.detail}</span>}</span>
              {value === option.value && <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
