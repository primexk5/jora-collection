export default function TabIcon({ name, active }) {
  const shapes = {
    home: <><path d="m3 10 7.8-6.4a1.9 1.9 0 0 1 2.4 0L21 10" /><path d="M5 9v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" /><path d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" /></>,
    shop: <><rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.8" /><rect x="14" y="3.5" width="6.5" height="6.5" rx="1.8" /><rect x="3.5" y="14" width="6.5" height="6.5" rx="1.8" /><rect x="14" y="14" width="6.5" height="6.5" rx="1.8" /></>,
    'new-arrivals': <><path d="M3.5 4.5v6.7a2 2 0 0 0 .6 1.4l7.3 7.3a2 2 0 0 0 2.8 0l5.7-5.7a2 2 0 0 0 0-2.8l-7.3-7.3a2 2 0 0 0-1.4-.6H4.5a1 1 0 0 0-1 1Z" /><circle cx="8" cy="8" r="1.2" /><path d="m11 13 2 2 3-3" /></>,
    lookbook: <><path d="M12 5.5C9 3.5 5.5 3.2 3 4v15c3-.8 6-.3 9 1.5 3-1.8 6-2.3 9-1.5V4c-2.5-.8-6-.5-9 1.5Z" /><path d="M12 5.5v15M6 8h3M6 11h3M15 8h3M15 11h3" /></>,
    contact: <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H9l-5.5 2 .9-5A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8 10h8M8 14h5" /></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '1.9' : '1.6'} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-[23px] w-[23px]">{shapes[name]}</svg>
}
