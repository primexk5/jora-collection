import { useCallback, useEffect, useState } from 'react'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Header from './components/Header'
import PrivacyPopup, { PRIVACY_ACK_KEY } from './components/PrivacyPopup'
import Quiz from './components/Quiz'
import StickyWhatsApp from './components/StickyWhatsApp'
import Toast from './components/Toast'
import { getProduct } from './data/products'
import useCart from './hooks/useCart'
import { NAV } from './lib/site'
import useScrollReveal from './hooks/useScrollReveal'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Lookbook from './pages/Lookbook'
import NewArrivals from './pages/NewArrivals'
import Privacy from './pages/Privacy'
import ProductDetail from './pages/ProductDetail'
import Shop from './pages/Shop'

const PAGE_IDS = NAV.map((item) => item.id)
const ROUTE_IDS = [...PAGE_IDS, 'privacy']

const PAGE_TITLES = {
  home: 'JORA Collection — Confidence you carry',
  shop: 'Shop the Collection — JORA Collection',
  'new-arrivals': 'New Arrivals — JORA Collection',
  lookbook: 'Lookbook — JORA Collection',
  about: 'About — JORA Collection',
  contact: 'Order / Contact — JORA Collection',
  privacy: 'Privacy & Cookies — JORA Collection',
}

function routeFromHash() {
  const hash = window.location.hash.replace(/^#/, '')
  if (hash.startsWith('bag/')) {
    const product = getProduct(decodeURIComponent(hash.slice(4)))
    if (product) return { page: 'shop', product }
  }
  return { page: ROUTE_IDS.includes(hash) ? hash : 'home', product: null }
}

function Page({
  page,
  product,
  category,
  onNavigate,
  onShopCategory,
  onCategoryChange,
  onOpenQuiz,
  onAddToCart,
  onOpenCart,
  onOpenPrivacy,
}) {
  if (product) {
    return (
      <ProductDetail
        key={product.id}
        product={product}
        onAddToCart={onAddToCart}
        onOpenCart={onOpenCart}
        onNavigate={onNavigate}
      />
    )
  }

  switch (page) {
    case 'shop':
      return (
        <Shop
          category={category}
          onCategoryChange={onCategoryChange}
          onOpenQuiz={onOpenQuiz}
        />
      )
    case 'new-arrivals':
      return <NewArrivals />
    case 'lookbook':
      return <Lookbook onNavigate={onNavigate} />
    case 'about':
      return <About onNavigate={onNavigate} />
    case 'contact':
      return <Contact />
    case 'privacy':
      return <Privacy onNavigate={onNavigate} onOpenSettings={onOpenPrivacy} />
    default:
      return (
        <Home
          onNavigate={onNavigate}
          onShopCategory={onShopCategory}
          onOpenQuiz={onOpenQuiz}
        />
      )
  }
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash)
  const [category, setCategory] = useState('all')
  const [quizOpen, setQuizOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const cart = useCart()
  const { page, product } = route

  useScrollReveal(`${page}-${category}-${product?.id ?? ''}`)

  useEffect(() => {
    document.title = product
      ? `${product.name} — JORA Collection`
      : (PAGE_TITLES[page] ?? PAGE_TITLES.home)
  }, [page, product])

  useEffect(() => {
    const onHashChange = () => {
      setRoute(routeFromHash())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 5000)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    let timer
    try {
      if (window.localStorage.getItem(PRIVACY_ACK_KEY)) return undefined
      timer = window.setTimeout(() => setPrivacyOpen(true), 1100)
    } catch {
      return undefined
    }
    return () => window.clearTimeout(timer)
  }, [])

  const navigate = useCallback(
    (id) => {
      if (!ROUTE_IDS.includes(id)) return
      setQuizOpen(false)
      setCartOpen(false)
      if (id === 'shop') setCategory('all')
      const current = routeFromHash()
      if (!current.product && current.page === id) {
        setRoute(current)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      window.location.hash = id
    },
    [],
  )

  const shopCategory = useCallback(
    (id) => {
      navigate('shop')
      setCategory(id)
    },
    [navigate],
  )

  const closeQuiz = useCallback(() => setQuizOpen(false), [])

  const acknowledgePrivacy = useCallback(() => {
    try {
      window.localStorage.setItem(PRIVACY_ACK_KEY, '1')
    } catch {
      setPrivacyOpen(false)
      return
    }
    setPrivacyOpen(false)
  }, [])

  const openPrivacy = useCallback(() => setPrivacyOpen(true), [])

  const readPrivacy = useCallback(() => {
    try {
      window.localStorage.setItem(PRIVACY_ACK_KEY, '1')
    } catch {
      setPrivacyOpen(false)
    }
    setPrivacyOpen(false)
    navigate('privacy')
  }, [navigate])

  const addToCart = ({ product: chosenProduct, color, size, quantity }) => {
    cart.add(chosenProduct.id, color, size, quantity)
    setToast({ message: `${chosenProduct.name} added to your bag.` })
  }

  const openCart = useCallback(() => {
    setToast(null)
    setCartOpen(true)
  }, [])

  const closeCart = useCallback(() => setCartOpen(false), [])

  return (
    <div className="flex min-h-screen flex-col bg-jora-soft">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-jora-navy focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.16em] focus:text-white"
      >
        Skip to content
      </a>

      <Header
        page={page}
        onNavigate={navigate}
        cartCount={cart.count}
        onOpenCart={openCart}
      />

      <main
        id="content"
        key={`${page}-${product?.id ?? 'page'}`}
        tabIndex={-1}
        className="anim-fade flex-1 outline-none"
      >
        <Page
          page={page}
          product={product}
          category={category}
          onNavigate={navigate}
          onShopCategory={shopCategory}
          onCategoryChange={setCategory}
          onOpenQuiz={() => setQuizOpen(true)}
          onAddToCart={addToCart}
          onOpenCart={openCart}
          onOpenPrivacy={openPrivacy}
        />
      </main>

      <Footer
        onNavigate={navigate}
        onShopCategory={shopCategory}
        onOpenPrivacy={openPrivacy}
      />
      <StickyWhatsApp />
      {cartOpen && (
        <CartDrawer
          items={cart.items}
          count={cart.count}
          subtotal={cart.subtotal}
          onClose={closeCart}
          onUpdateQuantity={cart.updateQuantity}
          onRemove={cart.remove}
          onClear={cart.clear}
          onNavigate={navigate}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          onViewCart={openCart}
          onDismiss={() => setToast(null)}
        />
      )}
      {quizOpen && <Quiz onClose={closeQuiz} onNavigate={navigate} />}
      <PrivacyPopup
        open={privacyOpen}
        onAccept={acknowledgePrivacy}
        onReadPolicy={readPrivacy}
      />
    </div>
  )
}
