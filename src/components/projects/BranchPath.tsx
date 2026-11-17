import { useRef } from 'react'
import { useGsap } from '../../hooks/useGsap'
import { gsap } from '../../lib/gsap'

const WIDTH = 360
const LANES = [84, 190, 296] as const
const GAP = 100
const TOP = 52

// One real path through PARALLEL's "Move Abroad" story: the decision points and the choices taken.
const steps = [
  { when: 'Month 01', label: 'Take the demanding project', lane: 0 },
  { when: 'Month 04', label: 'Go home for two weeks', lane: 1 },
  { when: 'Year 01', label: 'Accept the new role', lane: 0 },
  { when: 'Year 02', label: 'Travel for the wedding', lane: 2 },
  { when: 'Year 03', label: 'Put down roots here', lane: 1 },
] as const

const ending = { label: 'The Place That Learned Your Name', lane: 1 }
const HEIGHT = TOP + steps.length * GAP + 56

const yAt = (index: number) => TOP + index * GAP
const xAt = (lane: number) => LANES[lane] ?? LANES[1]

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mid = (y2 - y1) / 2
  return `M${x1} ${y1} C${x1} ${y1 + mid} ${x2} ${y2 - mid} ${x2} ${y2}`
}

const points = [
  ...steps.map((step, i) => ({ x: xAt(step.lane), y: yAt(i), label: step.label, lane: step.lane })),
  { x: xAt(ending.lane), y: yAt(steps.length), label: ending.label, lane: ending.lane },
]

/** Decision tree with one highlighted path. The path draws as the section scrolls into view. */
export function BranchPath() {
  const ref = useRef<SVGSVGElement>(null)

  useGsap(ref, () => {
    const svg = ref.current
    if (!svg) return
    const segments = gsap.utils.toArray<SVGPathElement>('[data-seg]', svg)
    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: svg, start: 'top 80%', end: 'bottom 55%', scrub: true },
    })
    gsap.set('[data-branch], [data-node], [data-label]', { autoAlpha: 0 })
    segments.forEach((segment, i) => {
      timeline
        .to(`[data-branch="${i}"]`, { autoAlpha: 1, duration: 0.35 }, i)
        .fromTo(segment, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, i)
        .to(
          `[data-node="${i + 1}"], [data-label="${i + 1}"]`,
          { autoAlpha: 1, duration: 0.3 },
          i + 0.8,
        )
    })
    gsap.set('[data-node="0"], [data-label="0"]', { autoAlpha: 1 })
  })

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Diagram of a branching story: five decisions, each with several choices, along one highlighted path to an ending."
      className="mx-auto h-auto w-full max-w-[26rem] overflow-visible"
    >
      {/* Choices not taken */}
      {points.slice(0, -1).map((from, i) => (
        <g key={`branch-${i}`} data-branch={i} className="text-fg/20">
          {LANES.map((lane, laneIndex) => {
            const toY = yAt(i + 1)
            return (
              <g key={laneIndex}>
                <path
                  d={curve(from.x, from.y, lane, toY)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle
                  cx={lane}
                  cy={toY}
                  r="4"
                  fill="var(--bg)"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </g>
            )
          })}
        </g>
      ))}

      {/* The chosen path */}
      {points.slice(0, -1).map((from, i) => {
        const to = points[i + 1]!
        return (
          <path
            key={`seg-${i}`}
            data-seg={i}
            d={curve(from.x, from.y, to.x, to.y)}
            pathLength={1}
            fill="none"
            stroke="var(--link)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
        )
      })}

      {points.map((point, i) => {
        const isEnding = i === steps.length
        const anchor = point.lane === 0 ? 'start' : point.lane === 2 ? 'end' : 'middle'
        const dx = point.lane === 0 ? 16 : point.lane === 2 ? -16 : 0
        const dy = point.lane === 1 ? 26 : 5
        return (
          <g key={`node-${i}`}>
            <g data-node={i} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <circle cx={point.x} cy={point.y} r={isEnding ? 8 : 6} fill="var(--link)" />
              {isEnding && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="14"
                  fill="none"
                  stroke="var(--link)"
                  strokeOpacity="0.4"
                />
              )}
            </g>
            <text
              data-label={i}
              x={point.x + dx}
              y={point.y + dy}
              textAnchor={anchor}
              fontSize="14.5"
              fontWeight={isEnding ? 600 : 500}
              fill="var(--fg)"
              stroke="var(--bg)"
              strokeWidth="6"
              strokeLinejoin="round"
              paintOrder="stroke"
            >
              {point.label}
            </text>
            {!isEnding && (
              <text
                data-label={i}
                x="0"
                y={point.y + 4}
                fontSize="11"
                fill="var(--muted)"
                fontFamily="var(--font-mono)"
                letterSpacing="0.06em"
              >
                {steps[i]?.when.toUpperCase()}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
