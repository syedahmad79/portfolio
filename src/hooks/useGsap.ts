import { useEffectEvent, useLayoutEffect, type RefObject } from 'react'
import { gsap, MEDIA } from '../lib/gsap'

interface MotionContext {
  desktop: boolean
}

/**
 * Runs a GSAP setup inside a matchMedia context scoped to `scope`.
 * It is skipped under prefers-reduced-motion, and everything it creates
 * (tweens and ScrollTriggers) is reverted on unmount or when the query changes.
 */
export function useGsap(
  scope: RefObject<Element | null>,
  setup: (context: MotionContext) => void | (() => void),
) {
  const run = useEffectEvent(setup)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope.current ?? undefined)
    mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktop }, (ctx) => {
      if (!ctx.conditions?.motion) return
      return run({ desktop: Boolean(ctx.conditions.desktop) })
    })
    return () => mm.revert()
  }, [scope])
}
