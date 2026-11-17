import { useSyncExternalStore, type ComponentProps, type MouseEvent } from 'react'

// A deliberately small History API router: this site has two kinds of route and a few hash links.

const NAVIGATE = 'app:navigate'
let navigations = 0

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(NAVIGATE, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(NAVIGATE, onChange)
  }
}

const getSnapshot = () => `${window.location.pathname}${window.location.hash}|${navigations}`

export function navigate(url: string) {
  window.history.pushState(null, '', url)
  navigations += 1
  window.dispatchEvent(new Event(NAVIGATE))
}

/** Current path and hash. `key` changes on every navigation, including to the same URL. */
export function useLocation() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => '/|0')
  const [url = '/', key = '0'] = snapshot.split('|')
  const hashAt = url.indexOf('#')
  return {
    pathname: hashAt === -1 ? url : url.slice(0, hashAt),
    hash: hashAt === -1 ? '' : url.slice(hashAt),
    key,
  }
}

type Target = string | { pathname: string; hash?: string }

const toHref = (to: Target) => (typeof to === 'string' ? to : `${to.pathname}${to.hash ?? ''}`)

/** In-app link: a real anchor that navigates without a page load for plain left clicks. */
export function Link({ to, onClick, ...rest }: Omit<ComponentProps<'a'>, 'href'> & { to: Target }) {
  const href = toHref(to)
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    event.preventDefault()
    navigate(href)
  }
  return <a href={href} onClick={handleClick} {...rest} />
}
