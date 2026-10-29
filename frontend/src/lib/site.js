export const SITE = {
  name: 'JORA Collection',
  url: 'https://jora-collection.vercel.app',
  tagline: 'Confidence you carry',
  headline: 'Every bag. Every mood. One confident you.',
  phoneDisplay: '0706 337 4333',
  phoneRaw: '07063374333',
  whatsapp: '2347063374333',
  location: 'Abuja, Nigeria',
  hours: 'Mon – Sat · 9am – 7pm',
  freeDeliveryNote: 'Free delivery in Abuja on orders over ₦50,000',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
  ],
}

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'lookbook', label: 'Lookbook' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Order / Contact' },
]

export function waLink(message) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export function formatNaira(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

export function orderMessage(product) {
  return ['🛍️ *JORA COLLECTION | ORDER REQUEST*', '', `*${product.name}*`, `Price: ${formatNaira(product.price)}`, '', 'Please confirm availability, delivery and payment details. Thank you!'].join('\n')
}

export function orderLink(product) {
  return waLink(orderMessage(product))
}

export const GENERAL_ORDER_LINK = waLink(
  'Hi JORA Collection, I would like to place an order. Please share what is available.',
)
