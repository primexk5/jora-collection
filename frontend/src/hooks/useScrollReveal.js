import { useEffect } from 'react'

export default function useScrollReveal(key) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))
    if (!nodes.length) return undefined

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))

    const fallback = window.setTimeout(() => {
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          node.classList.add('is-visible')
        }
      })
    }, 500)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [key])
}
