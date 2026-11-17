import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { m } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useGsap } from '../../hooks/useGsap'
import { useWhenViewed } from '../../hooks/useWhenViewed'
import { gsap } from '../../lib/gsap'
import { Img } from '../Img'

type Mode = 'compare' | 'diff'

const modes: { id: Mode; label: string }[] = [
  { id: 'compare', label: 'Slider' },
  { id: 'diff', label: 'Differences' },
]

// Regions flagged by the app's own comparison of its bundled sample, as % of the image.
const regions = [
  { id: 1, x: 66, y: 19, label: 'Missing badge' },
  { id: 2, x: 50, y: 33, label: 'Tighter card padding' },
  { id: 3, x: 59, y: 46, label: 'Darker button' },
  { id: 4, x: 37, y: 62, label: 'Shifted usage section' },
]

const clamp = (value: number) => Math.min(100, Math.max(0, value))
const spring = { type: 'spring', stiffness: 520, damping: 38 } as const

/** Before/after comparison built from Framecheck's own bundled sample images. */
export function CompareSlider() {
  const [mode, setMode] = useState<Mode>('compare')
  const [wantsDiff, setWantsDiff] = useState(false)
  const scope = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const position = useRef(50)
  const dragging = useRef(false)

  const apply = (value: number) => {
    const next = clamp(value)
    position.current = next
    stage.current?.style.setProperty('--pos', `${next}%`)
    handle.current?.setAttribute('aria-valuenow', String(Math.round(next)))
  }

  const fromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = stage.current?.getBoundingClientRect()
    if (rect) apply(((event.clientX - rect.left) / rect.width) * 100)
  }

  const pending = useRef<{ x: number; y: number } | null>(null)

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    fromPointer(event)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (mode !== 'compare' || (event.pointerType === 'mouse' && event.button !== 0)) return
    if (stage.current) gsap.killTweensOf(stage.current)
    if (event.pointerType === 'touch') {
      // Wait for horizontal intent so a vertical swipe still scrolls the page.
      pending.current = { x: event.clientX, y: event.clientY }
      return
    }
    startDrag(event)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) return fromPointer(event)
    const start = pending.current
    if (!start) return
    const dx = Math.abs(event.clientX - start.x)
    const dy = Math.abs(event.clientY - start.y)
    if (dx > 6 && dx > dy) {
      pending.current = null
      startDrag(event)
    }
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pending.current) fromPointer(event)
    pending.current = null
    dragging.current = false
  }

  const endDrag = () => {
    pending.current = null
    dragging.current = false
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 1
    const keys: Record<string, number> = {
      ArrowLeft: position.current - step,
      ArrowRight: position.current + step,
      ArrowDown: position.current - step,
      ArrowUp: position.current + step,
      Home: 0,
      End: 100,
    }
    const next = keys[event.key]
    if (next === undefined) return
    event.preventDefault()
    if (stage.current) gsap.killTweensOf(stage.current)
    apply(next)
  }

  useWhenViewed(stage, 1200, () => setWantsDiff(true))

  useGsap(scope, () => {
    if (!stage.current) return
    gsap.fromTo(
      stage.current,
      { '--pos': '94%' },
      {
        '--pos': '50%',
        duration: 1.6,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: stage.current, start: 'top 65%', once: true },
        onUpdate: () => {
          const raw = stage.current?.style.getPropertyValue('--pos') ?? '50%'
          handle.current?.setAttribute('aria-valuenow', String(Math.round(parseFloat(raw))))
        },
      },
    )
  })

  return (
    <div ref={scope}>
      <div data-mask="clip" className="border-line bg-raised overflow-hidden rounded-[10px] border">
        <div className="border-line flex items-center justify-between gap-4 border-b px-4 py-2.5">
          <p className="eyebrow">Framecheck · bundled sample</p>
          <div
            role="group"
            aria-label="Comparison view"
            className="bg-surface relative grid grid-cols-2 rounded-full p-0.5"
          >
            <m.span
              aria-hidden="true"
              className="bg-raised absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full shadow-[0_1px_2px_rgb(17_21_28/0.18)]"
              animate={{ x: mode === 'compare' ? 0 : '100%' }}
              transition={spring}
            />
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={mode === item.id}
                onClick={() => setMode(item.id)}
                onPointerEnter={item.id === 'diff' ? () => setWantsDiff(true) : undefined}
                onFocus={item.id === 'diff' ? () => setWantsDiff(true) : undefined}
                className={`relative z-10 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200 ${
                  mode === item.id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={stage}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={endDrag}
          className={`relative aspect-[16/10] touch-pan-y select-none overflow-hidden bg-[#f4f4f1] [--pos:50%] ${
            mode === 'compare' ? 'cursor-ew-resize' : ''
          }`}
        >
          <m.div
            className="absolute inset-0"
            animate={{ opacity: mode === 'compare' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Img
              name="framecheck-reference"
              sizes="(min-width: 1280px) 1184px, 92vw"
              alt="Reference: the billing settings design, with a dark sidebar, three plan cards and a usage section."
              draggable={false}
              className="absolute inset-0 size-full"
            />
            {/* The implementation is revealed by moving a clipping window and counter-moving its
                image, so dragging only changes transforms and never repaints. */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ transform: 'translate3d(var(--pos), 0, 0)' }}
            >
              <div
                className="absolute inset-0"
                style={{ transform: 'translate3d(calc(var(--pos) * -1), 0, 0)' }}
              >
                <Img
                  name="framecheck-implementation"
                  sizes="(min-width: 1280px) 1184px, 92vw"
                  alt="Implementation: the same page as built, with a missing badge, tighter card padding, a darker button and a shifted usage section."
                  draggable={false}
                  className="absolute inset-0 size-full"
                />
              </div>
            </div>
            <span className="bg-ink/80 text-paper pointer-events-none absolute bottom-3 left-3 rounded-full px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em]">
              Reference
            </span>
            <span className="bg-ink/80 text-paper pointer-events-none absolute bottom-3 right-3 rounded-full px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em]">
              Implementation
            </span>
            <div
              className="pointer-events-none absolute inset-0"
              style={{ transform: 'translate3d(var(--pos), 0, 0)' }}
            >
              <div className="absolute inset-y-0 left-0 w-px bg-white/90 shadow-[0_0_0_1px_rgb(17_21_28/0.25)]" />
              <div
                ref={handle}
                role="slider"
                tabIndex={mode === 'compare' ? 0 : -1}
                aria-label="Comparison position. Reference on the left, implementation on the right."
                aria-orientation="horizontal"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={50}
                onKeyDown={onKeyDown}
                className="bg-raised text-fg pointer-events-auto absolute left-0 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_2px_10px_rgb(17_21_28/0.35)]"
              >
                <ChevronLeft size={14} aria-hidden="true" className="-mr-1" />
                <ChevronRight size={14} aria-hidden="true" className="-ml-1" />
              </div>
            </div>
          </m.div>

          <m.div
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: mode === 'diff' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden={mode !== 'diff'}
          >
            {(wantsDiff || mode === 'diff') && (
              <Img
                priority
                name="framecheck-diff"
                sizes="(min-width: 1280px) 1184px, 92vw"
                alt="Difference view: the reference dimmed, with changed pixels highlighted in pink."
                className="absolute inset-0 size-full object-cover"
                draggable={false}
              />
            )}
            {regions.map((region) => (
              <span
                key={region.id}
                className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center"
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
              >
                <span
                  className="bg-link/40 absolute inset-0 rounded-full"
                  style={
                    mode === 'diff' ? { animation: 'pulse-ring 2.4s ease-out infinite' } : undefined
                  }
                />
                <span className="bg-ink text-paper relative grid size-5 place-items-center rounded-full font-mono text-[0.6875rem] font-medium">
                  {region.id}
                </span>
              </span>
            ))}
          </m.div>
        </div>

        <div className="border-line grid gap-4 border-t px-4 py-4 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
          <p className="min-h-[3.25rem]" aria-live="polite">
            {mode === 'diff' ? (
              <>
                <span className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">
                  1.33%
                </span>
                <span className="muted ml-2 text-sm">different</span>
                <span className="muted mt-1.5 block text-[0.8125rem]">
                  13,651 of 1,024,000 compared pixels · threshold 0.10
                </span>
              </>
            ) : (
              <span className="muted block max-w-[16rem] text-sm">
                Drag the divider, or focus it and use the arrow keys.
              </span>
            )}
          </p>
          <ol className="grid gap-x-6 gap-y-1.5 text-[0.875rem] sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region) => (
              <li key={region.id} className="flex items-center gap-2.5">
                <span className="bg-ink text-paper grid size-5 shrink-0 place-items-center rounded-full font-mono text-[0.6875rem]">
                  {region.id}
                </span>
                {region.label}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
