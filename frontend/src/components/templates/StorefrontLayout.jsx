import StickyWhatsApp from '../molecules/StickyWhatsApp'

export default function StorefrontLayout({ routeKey, header, footer, navigation, overlays, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-jora-soft">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-jora-navy focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.16em] focus:text-white"
      >
        Skip to content
      </a>
      {header}
      <main id="content" key={routeKey} tabIndex={-1} className="anim-fade flex-1 outline-none">
        {children}
      </main>
      {footer}
      <StickyWhatsApp />
      {navigation}
      {overlays}
    </div>
  )
}
