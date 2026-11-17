import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const MEDIA = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 768px)',
} as const
