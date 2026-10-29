import TabIcon from '../atoms/TabIcon'

export default function MobileTabs({ page, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'new-arrivals', label: 'New in' },
    { id: 'lookbook', label: 'Lookbook' },
    { id: 'contact', label: 'Contact' },
  ]
  return <nav aria-label="Mobile tabs" className="mobile-tabs fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-jora-charcoal/10 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
    {tabs.map(({ id, label }) => {
      const active = page === id
      return <button key={id} type="button" onClick={() => onNavigate(id)} aria-current={active ? 'page' : undefined} className={`relative flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-medium uppercase tracking-[0.08em] transition-colors ${active ? 'text-jora-red' : 'text-jora-charcoal/55 hover:text-jora-charcoal'}`}>
        <span className={`relative grid h-8 w-12 place-items-center rounded-full transition-colors ${active ? 'bg-jora-red/10' : 'bg-transparent'}`}><TabIcon name={id} active={active} /></span>
        {label}
      </button>
    })}
  </nav>
}
