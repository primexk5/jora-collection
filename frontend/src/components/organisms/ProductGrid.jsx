import ProductCard from './ProductCard'

export default function ProductGrid({ products, mobileRail = false }) {
  return (
    <div className={`${mobileRail ? 'product-mobile-rail' : 'grid-cols-2'} grid gap-x-3 gap-y-6 sm:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-4`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} delay={(index % 4) * 80} />
      ))}
    </div>
  )
}
