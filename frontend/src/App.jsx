import MobileTabs from './components/organisms/MobileTabs'
import { useCallback, useEffect, useState } from 'react'
import CartDrawer from './components/organisms/CartDrawer'
import Footer from './components/organisms/Footer'
import Header from './components/organisms/Header'
import PrivacyPopup, { PRIVACY_ACK_KEY } from './components/organisms/PrivacyPopup'
import Quiz from './components/organisms/Quiz'
import StorefrontLayout from './components/templates/StorefrontLayout'
import Toast from './components/molecules/Toast'
import useCart from './hooks/useCart'
import { ROUTE_IDS, routeFromLocation } from './lib/routes'
import useScrollReveal from './hooks/useScrollReveal'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Lookbook from './pages/Lookbook'
import NewArrivals from './pages/NewArrivals'
import Privacy from './pages/Privacy'
import ProductDetail from './pages/ProductDetail'
import Shop from './pages/Shop'

const PAGE_TITLES = {
  home: 'JORA Collection — Confidence you carry',
  shop: 'Shop the Collection — JORA Collection',
  'new-arrivals': 'New Arrivals — JORA Collection',
  lookbook: 'Lookbook — JORA Collection',
  about: 'About — JORA Collection',
  contact: 'Order / Contact — JORA Collection',
  privacy: 'Privacy & Cookies — JORA Collection',
}

function Page({
  page,
  product,
  category,
  searchQuery,
  onSearchChange,
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
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
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
  const [route, setRoute] = useState(routeFromLocation)
  const [category, setCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
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
      setRoute(routeFromLocation())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onHashChange)
    }
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
      if (id === 'shop') { setCategory('all'); setSearchQuery('') }
      const current = routeFromLocation()
      if (!current.product && current.page === id) {
        setRoute(current)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      window.history.pushState(null, '', `/#${id}`)
      setRoute({ page: id, product: null })
      window.scrollTo({ top: 0, behavior: 'auto' })
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
    <StorefrontLayout
      routeKey={`${page}-${product?.id ?? 'page'}`}
      header={
        <Header
          page={page}
          onNavigate={navigate}
          cartCount={cart.count}
          onOpenCart={openCart}
          onSearch={(query) => { navigate('shop'); setSearchQuery(query) }}
        />
      }
      footer={
        <Footer
          onNavigate={navigate}
          onShopCategory={shopCategory}
          onOpenPrivacy={openPrivacy}
        />
      }
      navigation={<MobileTabs page={page} onNavigate={navigate} />}
      overlays={
        <>
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
        </>
      }
    >
      <Page
        page={page}
        product={product}
        category={category}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={navigate}
        onShopCategory={shopCategory}
        onCategoryChange={setCategory}
        onOpenQuiz={() => setQuizOpen(true)}
        onAddToCart={addToCart}
        onOpenCart={openCart}
        onOpenPrivacy={openPrivacy}
      />
    </StorefrontLayout>
  )
}
