import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from '../lib/router'
import { AnimatePresence, m } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'
import { SECTIONS_READY } from '../lib/events'
import { GithubIcon, LinkedinIcon } from './icons'

type Theme = 'light' | 'dark'

/** Tracks which themed section sits under the navigation bar. */
function useSectionUnderNav() {
  const [state, setState] = useState<{ theme: Theme; active: string | null }>({
    theme: 'light',
    active: null,
  })

  useEffect(() => {
    let observer: IntersectionObserver | undefined

    const connect = () => {
      observer?.disconnect()
      const line = 56
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = entry.target as HTMLElement
            setState({
              theme: el.dataset.theme === 'dark' ? 'dark' : 'light',
              active: el.dataset.nav ?? null,
            })
          }
        },
        { rootMargin: `-${line}px 0px -${Math.max(window.innerHeight - line - 1, 0)}px 0px` },
      )
      document.querySelectorAll('[data-theme]').forEach((el) => observer?.observe(el))
    }

    connect()
    window.addEventListener('resize', connect)
    window.addEventListener(SECTIONS_READY, connect)
    return () => {
      window.removeEventListener('resize', connect)
      window.removeEventListener(SECTIONS_READY, connect)
      observer?.disconnect()
    }
  }, [])

  return state
}

export function Nav() {
  const { theme, active } = useSectionUnderNav()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const wide = window.matchMedia('(min-width: 768px)')
    const closeOnWide = () => wide.matches && setOpen(false)
    wide.addEventListener('change', closeOnWide)
    return () => {
      document.documentElement.style.overflow = previous
      wide.removeEventListener('change', closeOnWide)
    }
  }, [open])

  const close = () => setOpen(false)

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!open) return
    if (event.key === 'Escape') {
      close()
      toggleRef.current?.focus()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = Array.from(
      headerRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [],
    ).filter((el) => el.offsetParent !== null)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const solid = scrolled || open

  return (
    <header
      ref={headerRef}
      onKeyDown={onKeyDown}
      className={`${theme === 'dark' ? 'theme-dark' : 'theme-light'} fixed inset-x-0 top-0 z-50 text-fg`}
    >
      <a
        href="#main"
        className="sr-only-focusable bg-fg text-bg absolute left-4 top-3 z-10 rounded-full px-4 py-2 text-sm font-medium"
      >
        Skip to content
      </a>
      <div
        className={`border-b transition-[background-color,border-color] duration-300 ${
          solid ? 'border-line bg-bg' : 'border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="wrap flex h-16 items-center justify-between">
          <div className="nav-in">
            <Link
              to="/"
              onClick={close}
              className="group flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-[-0.03em]"
            >
              <span
                aria-hidden="true"
                className="bg-accent block size-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
              />
              {profile.wordmark}
            </Link>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <ul className="nav-in flex items-center">
              {profile.nav.map((item) => (
                <li key={item.id}>
                  <Link
                    to={{ pathname: '/', hash: `#${item.id}` }}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="text-muted hover:text-fg aria-[current=true]:text-fg relative block px-3 py-2 text-sm transition-colors duration-200"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`bg-link absolute inset-x-3 bottom-1 h-px origin-left transition-transform duration-300 ${
                        active === item.id ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nav-in border-line ml-3 flex items-center gap-0.5 border-l pl-3">
              <SocialIconLink href={profile.links.github} label="GitHub profile">
                <GithubIcon size={18} />
              </SocialIconLink>
              <SocialIconLink href={profile.links.linkedin} label="LinkedIn profile">
                <LinkedinIcon size={17} />
              </SocialIconLink>
            </div>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="nav-in -mr-2 grid size-11 place-items-center rounded-full md:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-bg absolute inset-x-0 top-16 h-[calc(100svh-4rem)] overflow-y-auto md:hidden"
          >
            <div className="wrap flex min-h-full flex-col justify-between pb-10 pt-6">
              <ul className="flex flex-col">
                {profile.nav.map((item, index) => (
                  <li key={item.id} className="border-line border-b">
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      to={{ pathname: '/', hash: `#${item.id}` }}
                      onClick={close}
                      aria-current={active === item.id ? 'true' : undefined}
                      className="aria-[current=true]:text-link flex items-baseline justify-between py-5 text-[2rem] font-semibold tracking-[-0.04em]"
                    >
                      {item.label}
                      <span className="eyebrow" aria-hidden="true">
                        0{index + 1}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-10 flex flex-col gap-1">
                <li>
                  <MenuExternal href={profile.links.github} icon={<GithubIcon size={20} />}>
                    GitHub
                  </MenuExternal>
                </li>
                <li>
                  <MenuExternal href={profile.links.linkedin} icon={<LinkedinIcon size={19} />}>
                    LinkedIn
                  </MenuExternal>
                </li>
              </ul>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 520, damping: 30 }}
      className="text-muted hover:text-fg grid size-9 place-items-center rounded-full transition-colors duration-200"
    >
      {children}
    </m.a>
  )
}

function MenuExternal({
  href,
  icon,
  children,
}: {
  href: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 py-3 text-lg font-medium"
    >
      {icon}
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
