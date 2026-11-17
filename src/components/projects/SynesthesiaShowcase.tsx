import { useRef, useState, type KeyboardEvent } from 'react'
import { m } from 'motion/react'
import { projects, type ImageName } from '../../data/projects'
import { useGsap } from '../../hooks/useGsap'
import { useWhenViewed } from '../../hooks/useWhenViewed'
import { gsap } from '../../lib/gsap'
import { Img } from '../Img'
import { ProjectActions, ProjectDetails, ProjectLabel } from './ProjectParts'

const project = projects[1]!

const worlds: { id: string; label: string; image: ImageName; alt: string }[] = [
  {
    id: 'galaxy',
    label: 'Galaxy',
    image: 'synesthesia-galaxy',
    alt: 'The Galaxy world: a spiral of glowing particles with a bright core.',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    image: 'synesthesia-ocean',
    alt: 'The Ocean world: a rolling swell of violet particles.',
  },
  {
    id: 'aurora',
    label: 'Aurora',
    image: 'synesthesia-aurora',
    alt: 'The Aurora world: curtains of particles across a dark sky.',
  },
  {
    id: 'nebula',
    label: 'Nebula',
    image: 'synesthesia-nebula',
    alt: 'The Nebula world: a soft cloud of particles.',
  },
  {
    id: 'pulse',
    label: 'Pulse',
    image: 'synesthesia-pulse',
    alt: 'The Pulse world: concentric rings of particles.',
  },
]

export function SynesthesiaShowcase() {
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]))
  const scope = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (index: number, focus = false) => {
    setActive(index)
    setSeen((prev) => (prev.has(index) ? prev : new Set(prev).add(index)))
    if (focus) tabs.current[index]?.focus()
  }

  const preload = (index: number) =>
    setSeen((prev) => (prev.has(index) ? prev : new Set(prev).add(index)))

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = worlds.length - 1
    const next =
      event.key === 'ArrowRight'
        ? active === last
          ? 0
          : active + 1
        : event.key === 'ArrowLeft'
          ? active === 0
            ? last
            : active - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    select(next, true)
  }

  useWhenViewed(stage, 1500, () => setSeen(new Set(worlds.map((_, i) => i))))

  useGsap(scope, ({ desktop }) => {
    const frame = stage.current
    if (!frame) return
    const layers = frame.querySelector('[data-syn-layer]')

    // Keep the stage's layer ready and run the ambient drift only while it is within a screen of
    // the viewport.
    const watch = new IntersectionObserver(
      ([entry]) => {
        const near = Boolean(entry?.isIntersecting)
        frame.dataset.live = String(near)
        frame.style.willChange = near && desktop ? 'transform' : 'auto'
      },
      { rootMargin: '100% 0px' },
    )
    watch.observe(frame)

    // Desktop: the stage grows from an inset card to full bleed, and the image drifts a little
    // slower than the page. Both are transform-only and follow the scroll one to one.
    if (desktop) {
      gsap.fromTo(
        frame,
        { scale: 0.9 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top 92%', end: 'top 30%', scrub: true },
        },
      )
      gsap.fromTo(
        layers,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }
    return () => watch.disconnect()
  })

  return (
    <section
      ref={scope}
      id="synesthesia"
      data-theme="dark"
      data-nav="work"
      aria-labelledby="synesthesia-title"
      className="theme-dark bg-bg text-fg relative overflow-clip"
    >
      <div className="wrap pt-[var(--section-y)]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div data-reveal>
              <ProjectLabel project={project} />
            </div>
            <h3
              id="synesthesia-title"
              data-reveal="heading"
              className="display-l mt-5 tracking-[-0.03em]"
            >
              {project.name}
            </h3>
          </div>
          <div data-reveal className="md:col-span-4 lg:col-span-4">
            <p className="lead">{project.summary}</p>
          </div>
        </div>
        <div data-reveal className="mt-8">
          <ProjectActions project={project} />
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <div
          ref={stage}
          className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] md:aspect-[16/9]"
        >
          <div
            data-syn-layer
            className="absolute inset-x-0 -inset-y-[5%]"
            role="tabpanel"
            id="syn-panel"
            aria-labelledby={`syn-tab-${worlds[active]?.id}`}
          >
            {worlds.map((world, index) =>
              seen.has(index) ? (
                <m.div
                  key={world.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === index ? 1 : 0 }}
                  transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  aria-hidden={active !== index}
                >
                  <Img
                    name={world.image}
                    sizes="100vw"
                    alt={active === index ? world.alt : ''}
                    priority={index !== 0}
                    className={`absolute inset-0 size-full object-cover ${active === index ? 'drift' : ''}`}
                  />
                </m.div>
              ) : null,
            )}
          </div>
          <div
            aria-hidden="true"
            className="from-bg via-bg/10 to-bg/40 pointer-events-none absolute inset-0 bg-gradient-to-t"
          />

          <div className="absolute bottom-8 right-6 hidden w-[34%] max-w-[34rem] lg:block lg:right-10">
            <Img
              name="synesthesia-ui"
              sizes="(min-width: 1280px) 460px, 36vw"
              alt="The SYNESTHESIA interface: header controls, the Galaxy world, a visual settings panel, the world selector and the playback bar."
              className="border-line rounded-md border shadow-[0_24px_60px_-12px_rgb(0_0_0/0.6)]"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0">
            <div className="wrap pb-6 md:pb-8">
              <div
                role="tablist"
                aria-label="SYNESTHESIA worlds"
                onKeyDown={onKeyDown}
                className="flex flex-wrap gap-x-6 gap-y-1"
              >
                {worlds.map((world, index) => (
                  <button
                    key={world.id}
                    ref={(el) => {
                      tabs.current[index] = el
                    }}
                    role="tab"
                    type="button"
                    id={`syn-tab-${world.id}`}
                    aria-selected={active === index}
                    aria-controls="syn-panel"
                    tabIndex={active === index ? 0 : -1}
                    onClick={() => select(index)}
                    onPointerEnter={() => preload(index)}
                    onFocus={() => preload(index)}
                    className={`group relative py-2.5 font-mono text-[0.8125rem] uppercase tracking-[0.06em] transition-colors duration-200 ${
                      active === index ? 'text-fg' : 'text-fg/60 hover:text-fg'
                    }`}
                  >
                    <span className="mr-2 opacity-60">0{index + 1}</span>
                    {world.label}
                    <span
                      aria-hidden="true"
                      className={`bg-link absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500 ${
                        active === index ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap pb-[var(--section-y)] pt-12 md:pt-16">
        <ProjectDetails project={project} />
      </div>
    </section>
  )
}
