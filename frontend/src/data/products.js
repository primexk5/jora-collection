export const CATEGORIES = [
  {
    id: 'handbags',
    label: 'Handbags',
    variant: 'handbag',
    palette: 'noir',
    note: 'Structured shapes for work, church and everything after.',
  },
  {
    id: 'crossbody',
    label: 'Crossbody',
    variant: 'crossbody',
    palette: 'red',
    note: 'Hands free, head high. Made for moving through the day.',
  },
  {
    id: 'totes',
    label: 'Totes',
    variant: 'tote',
    palette: 'cream',
    note: 'Room for the laptop, the lipstick and the plans.',
  },
  {
    id: 'backpacks',
    label: 'Backpacks',
    variant: 'backpack',
    palette: 'silver',
    note: 'Easy carry with a clean, grown-up finish.',
  },
  {
    id: 'travel',
    label: 'Travel',
    variant: 'travel',
    palette: 'navy',
    note: 'Weekend plans, cabin bags and airport confidence.',
  },
  {
    id: 'clutches',
    label: 'Clutches',
    variant: 'clutch',
    palette: 'gold',
    note: 'One elegant detail for the evening.',
  },
]

export const PRODUCTS = [
  {
    id: 'ada-top-handle',
    name: 'Ada Top Handle',
    category: 'handbags',
    price: 68500,
    badge: 'Bestseller',
    variant: 'handbag',
    palette: 'noir',
    tags: ['work', 'classic', 'bold'],
  },
  {
    id: 'amara-crossbody',
    name: 'Amara Crossbody',
    category: 'crossbody',
    price: 42500,
    variant: 'crossbody',
    palette: 'noir',
    tags: ['weekend', 'minimal', 'work'],
  },
  {
    id: 'zara-everyday-tote',
    name: 'Zara Everyday Tote',
    category: 'totes',
    price: 55000,
    badge: 'Bestseller',
    variant: 'tote',
    palette: 'cream',
    tags: ['work', 'minimal', 'travel'],
  },
  {
    id: 'nkem-structured',
    name: 'Nkem Structured',
    category: 'handbags',
    price: 79000,
    variant: 'handbag',
    palette: 'navy',
    tags: ['work', 'classic', 'evening'],
  },
  {
    id: 'ife-clutch',
    name: 'Ife Clutch',
    category: 'clutches',
    price: 38000,
    variant: 'clutch',
    palette: 'gold',
    tags: ['evening', 'classic', 'bold'],
  },
  {
    id: 'bisi-mini',
    name: 'Bisi Mini',
    category: 'crossbody',
    price: 39500,
    variant: 'crossbody',
    palette: 'red',
    tags: ['weekend', 'bold', 'evening'],
  },
  {
    id: 'tola-weekender',
    name: 'Tola Weekender',
    category: 'travel',
    price: 89500,
    variant: 'travel',
    palette: 'navy',
    tags: ['travel', 'classic', 'work'],
  },
  {
    id: 'kemi-backpack',
    name: 'Kemi City Backpack',
    category: 'backpacks',
    price: 52000,
    variant: 'backpack',
    palette: 'silver',
    tags: ['work', 'minimal', 'travel'],
  },
  {
    id: 'ada-gold-edition',
    name: 'Ada Gold Edition',
    category: 'handbags',
    price: 92000,
    badge: 'New',
    variant: 'handbag',
    palette: 'gold',
    tags: ['evening', 'classic', 'bold'],
    featured: true,
  },
  {
    id: 'amara-noir',
    name: 'Amara Noir',
    category: 'crossbody',
    price: 44000,
    badge: 'New',
    variant: 'crossbody',
    palette: 'navy',
    tags: ['weekend', 'minimal', 'evening'],
  },
  {
    id: 'zara-soft-tote',
    name: 'Zara Soft Tote',
    category: 'totes',
    price: 58000,
    badge: 'New',
    variant: 'tote',
    palette: 'blush',
    tags: ['weekend', 'soft', 'work'],
  },
  {
    id: 'ife-evening-clutch',
    name: 'Ife Evening Clutch',
    category: 'clutches',
    price: 41000,
    badge: 'New',
    variant: 'clutch',
    palette: 'noir',
    tags: ['evening', 'bold', 'classic'],
  },
  {
    id: 'tola-cabin-duffel',
    name: 'Tola Cabin Duffel',
    category: 'travel',
    price: 73500,
    badge: 'New',
    variant: 'travel',
    palette: 'silver',
    tags: ['travel', 'minimal', 'weekend'],
  },
  {
    id: 'kemi-day-pack',
    name: 'Kemi Day Pack',
    category: 'backpacks',
    price: 49500,
    badge: 'New',
    variant: 'backpack',
    palette: 'cream',
    tags: ['weekend', 'soft', 'travel'],
  },
  {
    id: 'nkem-rose',
    name: 'Nkem Rose',
    category: 'handbags',
    price: 76000,
    badge: 'New',
    variant: 'handbag',
    palette: 'red',
    tags: ['evening', 'bold', 'weekend'],
  },
  {
    id: 'bisi-chain',
    name: 'Bisi Chain Crossbody',
    category: 'crossbody',
    price: 46500,
    variant: 'crossbody',
    palette: 'gold',
    tags: ['evening', 'classic', 'soft'],
  },
]

export const NEW_ARRIVALS = PRODUCTS.filter((product) => product.badge === 'New')

export const FEATURED = PRODUCTS.find((product) => product.featured)

export function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id)
}

export const TESTIMONIALS = [
  {
    quote:
      'The Ada bag is even richer in person. It has become my meeting-to-dinner bag — I get compliments every single time.',
    name: 'Chioma A.',
    city: 'Abuja',
    bag: 'Ada Top Handle',
  },
  {
    quote:
      'I ordered on WhatsApp at 9am and had it in Abuja the next day. The packaging alone felt like a gift to myself.',
    name: 'Tunde O.',
    city: 'Abuja',
    bag: 'Tola Weekender',
  },
  {
    quote:
      'Finally a bag that works with my blazer and my weekend jeans. The quality feels way above the price.',
    name: 'Amaka N.',
    city: 'Port Harcourt',
    bag: 'Amara Crossbody',
  },
]

export const VALUES = [
  {
    title: 'Chosen with care',
    body: 'Every style is hand-picked for shape, stitching and the way it sits on the shoulder all day.',
  },
  {
    title: 'Confidence first',
    body: 'A bag should finish the look, not fight it. We keep the edit clean, timeless and easy to style.',
  },
  {
    title: 'Delivered with detail',
    body: 'Gift wrapping, delivery tracking and honest updates — all handled personally on WhatsApp.',
  },
]

export const COLOR_LIBRARY = {
  noir: { name: 'Onyx Black', hex: '#262626' },
  navy: { name: 'Midnight Navy', hex: '#1b2233' },
  gold: { name: 'Champagne Gold', hex: '#c9a66b' },
  cream: { name: 'Ivory', hex: '#ece5d8' },
  silver: { name: 'Silver Grey', hex: '#c9cbce' },
  red: { name: 'Rose Red', hex: '#e8185a' },
  blush: { name: 'Soft Blush', hex: '#e5c2ca' },
}

const CATEGORY_COLORS = {
  handbags: ['noir', 'navy', 'gold'],
  crossbody: ['noir', 'red', 'gold'],
  totes: ['cream', 'navy', 'blush'],
  backpacks: ['silver', 'navy', 'cream'],
  travel: ['navy', 'silver', 'gold'],
  clutches: ['gold', 'noir', 'red'],
}

const CATEGORY_SIZES = {
  handbags: [
    { label: 'Mini', dimensions: '22 × 16 × 9 cm', delta: -5000 },
    { label: 'Classic', dimensions: '30 × 22 × 12 cm', delta: 0 },
    { label: 'Large', dimensions: '36 × 26 × 14 cm', delta: 7000 },
  ],
  crossbody: [
    { label: 'Mini', dimensions: '18 × 13 × 7 cm', delta: -3000 },
    { label: 'Classic', dimensions: '24 × 17 × 8 cm', delta: 0 },
  ],
  totes: [
    { label: 'Classic', dimensions: '34 × 28 × 12 cm', delta: 0 },
    { label: 'Large', dimensions: '40 × 32 × 14 cm', delta: 6000 },
  ],
  backpacks: [
    { label: 'Daily', dimensions: '28 × 38 × 13 cm', delta: 0 },
    { label: 'Travel', dimensions: '32 × 44 × 16 cm', delta: 6000 },
  ],
  travel: [
    { label: 'Cabin', dimensions: '45 × 25 × 23 cm', delta: 0 },
    { label: 'Weekender', dimensions: '52 × 30 × 28 cm', delta: 12000 },
  ],
  clutches: [
    { label: 'Slim', dimensions: '26 × 14 × 5 cm', delta: 0 },
    { label: 'Oversized', dimensions: '32 × 18 × 7 cm', delta: 4000 },
  ],
}

const CATEGORY_SPECS = {
  handbags: [
    ['Material', 'Premium leather-feel finish'],
    ['Lining', 'Soft microfibre'],
    ['Hardware', 'Gold-tone finish'],
    ['Closure', 'Flap with press lock'],
    ['Carry', 'Top handle + detachable shoulder strap'],
    ['Care', 'Wipe with a soft dry cloth'],
  ],
  crossbody: [
    ['Material', 'Premium leather-feel finish'],
    ['Lining', 'Soft microfibre'],
    ['Hardware', 'Gold-tone finish'],
    ['Closure', 'Flap with clasp'],
    ['Carry', 'Adjustable crossbody strap'],
    ['Care', 'Wipe with a soft dry cloth'],
  ],
  totes: [
    ['Material', 'Premium leather-feel finish'],
    ['Lining', 'Soft microfibre'],
    ['Hardware', 'Gold-tone finish'],
    ['Closure', 'Magnetic top clasp'],
    ['Carry', 'Shoulder straps'],
    ['Care', 'Wipe with a soft dry cloth'],
  ],
  backpacks: [
    ['Material', 'Premium leather-feel finish'],
    ['Lining', 'Water-resistant lining'],
    ['Hardware', 'Gold-tone finish'],
    ['Closure', 'Zip closure'],
    ['Carry', 'Padded shoulder straps'],
    ['Care', 'Wipe with a soft dry cloth'],
  ],
  travel: [
    ['Material', 'Premium leather-feel finish'],
    ['Lining', 'Water-resistant lining'],
    ['Hardware', 'Gold-tone finish'],
    ['Closure', 'Zip top'],
    ['Carry', 'Top handles + detachable shoulder strap'],
    ['Care', 'Wipe with a soft dry cloth'],
  ],
  clutches: [
    ['Material', 'Premium leather-feel finish'],
    ['Lining', 'Satin-feel lining'],
    ['Hardware', 'Gold-tone finish'],
    ['Closure', 'Snap clasp'],
    ['Carry', 'Detachable chain strap'],
    ['Care', 'Wipe with a soft dry cloth'],
  ],
}

export function getColors(product) {
  const ids = [product.palette, ...(CATEGORY_COLORS[product.category] ?? [])]
  return [...new Set(ids)].map((id) => ({
    id,
    name: COLOR_LIBRARY[id]?.name ?? id,
    hex: COLOR_LIBRARY[id]?.hex ?? '#262626',
  }))
}

export function getColor(product, id) {
  const colors = getColors(product)
  return colors.find((color) => color.id === id) ?? colors[0]
}

export function getSizes(product) {
  return CATEGORY_SIZES[product.category] ?? []
}

export function getSize(product, label) {
  const sizes = getSizes(product)
  return sizes.find((size) => size.label === label) ?? sizes[0]
}

export function defaultSize(product) {
  const sizes = getSizes(product)
  return sizes.find((size) => size.delta === 0) ?? sizes[0]
}

export function priceFor(product, sizeLabel) {
  const size = getSize(product, sizeLabel)
  return product.price + (size?.delta ?? 0)
}

export function getSpecs(product) {
  return CATEGORY_SPECS[product.category] ?? []
}

export function getDescription(product) {
  const category = CATEGORIES.find((item) => item.id === product.category)
  return `${product.name} is part of the JORA ${category?.label ?? ''} edit. ${
    category?.note ?? ''
  } Finished with gold-tone hardware and clean stitching, it is made to move from day to evening without a second thought.`
}
