import { useEffect, type RefObject } from 'react'
import { SECTIONS_READY } from '../lib/events'
import { useReveal } from './useReveal'

/** Reveals for a block of sections, then announces it so the navigation can observe them. */
export function useScrollMotion(scope: RefObject<HTMLElement | null>) {
  useReveal(scope)

  useEffect(() => {
    window.dispatchEvent(new Event(SECTIONS_READY))
  }, [])
}
