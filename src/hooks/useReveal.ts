import { useEffect, type RefObject } from 'react'

/**
 * One IntersectionObserver reveals every `[data-reveal]` and `[data-mask]` element inside `scope`
 * the first time it nears the viewport. The motion itself is a CSS transition on opacity and
 * transform (see index.css), so there are no scroll handlers and nothing is measured on scroll.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current
    if (!root || !document.documentElement.classList.contains('motion-ok')) return

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.style.setProperty('--d', `${Math.min(order++, 4) * 60}ms`)
          el.classList.add('is-in')
          observer.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -6% 0px' },
    )

    root.querySelectorAll('[data-reveal],[data-mask]').forEach((el) => {
      if (!el.classList.contains('is-in')) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [scope])
}
