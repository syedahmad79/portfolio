import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { profile } from '../data/profile'
import { Button, TextLink } from './Button'
import { GithubIcon, LinkedinIcon } from './icons'

const CELL = 64

const specs = [
  { label: 'Role', value: profile.headline },
  { label: 'Studying', value: 'BCS (Hons) Artificial Intelligence' },
  { label: 'Studio', value: 'Founder & Owner, Veltr Studio' },
  { label: 'Based in', value: profile.location },
]

/** A cell outline that snaps to the technical grid under the pointer and reads out its coordinates. */
function GridCursor({ area }: { area: RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 })
  const [cell, setCell] = useState({ col: 0, row: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = area.current
    if (!el || reduce) return
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = el.getBoundingClientRect()
      const col = Math.floor((event.clientX - rect.left) / CELL)
      const row = Math.floor((event.clientY - rect.top) / CELL)
      x.set(col * CELL)
      y.set(row * CELL)
      setCell((prev) => (prev.col === col && prev.row === row ? prev : { col, row }))
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [area, reduce, x, y])

  if (reduce) return null

  return (
    <m.div
      aria-hidden="true"
      style={{ x: sx, y: sy, width: CELL, height: CELL }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      className="border-link/50 bg-link/[0.05] pointer-events-none absolute left-0 top-0 hidden border md:block"
    >
      <span className="bg-link/60 absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2" />
      <span className="bg-link/60 absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2" />
      <span className="text-link absolute left-full top-full ml-1.5 mt-1 whitespace-nowrap font-mono text-[0.6875rem] tracking-[0.04em]">
        x {String(cell.col).padStart(2, '0')} · y {String(cell.row).padStart(2, '0')}
      </span>
    </m.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  return (
    <section
      ref={ref}
      id="top"
      data-theme="light"
      aria-label="Introduction"
      className="theme-light bg-bg text-fg relative isolate overflow-clip"
    >
      <div
        aria-hidden="true"
        className="hero-grid tech-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_40%,transparent_95%)]"
      />
      <GridCursor area={ref} />

      <div className="wrap flex min-h-svh flex-col pb-8 pt-28 md:pt-36">
        <p className="hero-eyebrow eyebrow flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Kuala Lumpur, MY</span>
          <span aria-hidden="true" className="bg-line hidden h-px w-8 sm:block" />
          <span>3.1390° N, 101.6869° E</span>
        </p>

        <h1 className="mt-8 md:mt-12">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <span style={{ '--i': 0 } as CSSProperties} className="hero-line display-xl block">
              {profile.name}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.15em]">
            <span
              style={{ '--i': 1 } as CSSProperties}
              className="hero-line text-muted mt-4 block text-[clamp(1.75rem,1rem+3.4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.035em] md:mt-6"
            >
              <span className="text-fg">Full-Stack</span> Developer
              <span className="text-link">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-12 md:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p style={{ '--i': 0 } as CSSProperties} className="hero-in lead max-w-[34rem]">
              {profile.intro}
            </p>
            <p
              style={{ '--i': 1 } as CSSProperties}
              className="hero-in muted mt-4 text-[0.9375rem]"
            >
              {profile.secondary} · Founder of Veltr Studio
            </p>
            <div
              style={{ '--i': 2 } as CSSProperties}
              className="hero-in mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button to="/#work" icon={<ArrowDown size={18} aria-hidden="true" />}>
                Explore My Work
              </Button>
              <Button to="/#contact" variant="secondary">
                Get in Touch
              </Button>
            </div>
          </div>

          <dl
            style={{ '--i': 3 } as CSSProperties}
            className="hero-in lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="border-line grid grid-cols-[6.5rem_1fr] gap-4 border-t py-3 text-[0.9375rem] last:border-b"
              >
                <dt className="eyebrow pt-0.5">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          style={{ '--i': 4 } as CSSProperties}
          className="hero-in border-line mt-auto flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t pt-5 md:mt-24"
        >
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <TextLink
                href={profile.links.github}
                arrow={false}
                className="text-muted hover:text-fg gap-2"
              >
                <GithubIcon size={16} />
                GitHub
              </TextLink>
            </li>
            <li>
              <TextLink
                href={profile.links.linkedin}
                arrow={false}
                className="text-muted hover:text-fg gap-2"
              >
                <LinkedinIcon size={15} />
                LinkedIn
              </TextLink>
            </li>
          </ul>
          <a
            href="#work"
            className="eyebrow hover:text-fg flex items-center gap-2 transition-colors"
          >
            Selected work
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
