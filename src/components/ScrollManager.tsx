import { useLayoutEffect, useRef } from 'react'
import { useLocation } from '../lib/router'
import { SECTIONS_READY } from '../lib/events'

function goToHash(hash: string, behavior: ScrollBehavior) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!target) return false
  target.scrollIntoView({ behavior })
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  return true
}

/** Restores scroll on navigation and moves focus to the target section for hash links. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const previous = useRef(pathname)

  useLayoutEffect(() => {
    const samePage = previous.current === pathname
    previous.current = pathname
    const behavior: ScrollBehavior = samePage ? 'auto' : 'instant'

    if (hash && goToHash(hash, behavior)) return
    if (hash) {
      // The section is in a lazily loaded chunk: scroll once it arrives.
      const onReady = () => goToHash(hash, 'instant')
      window.addEventListener(SECTIONS_READY, onReady, { once: true })
      return () => window.removeEventListener(SECTIONS_READY, onReady)
    }
    window.scrollTo({ top: 0, behavior })
  }, [pathname, hash, key])

  return null
}
