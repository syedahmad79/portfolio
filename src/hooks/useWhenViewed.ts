import { useEffect, type RefObject } from 'react'

/**
 * Calls `onViewed` once the element has stayed on screen for `delay` ms, unless the visitor has
 * asked the browser to save data. Used to warm up secondary previews while they are being read.
 */
export function useWhenViewed(ref: RefObject<Element | null>, delay: number, onViewed: () => void) {
  useEffect(() => {
    const el = ref.current
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (!el || connection?.saveData) return
    let timer: number | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer)
        if (!entry?.isIntersecting) return
        timer = window.setTimeout(() => {
          onViewed()
          observer.disconnect()
        }, delay)
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
    // onViewed is a stable state setter wrapper at the call sites; re-subscribing is not needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, delay])
}
