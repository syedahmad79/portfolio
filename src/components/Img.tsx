import { useEffect, useRef, type ImgHTMLAttributes } from 'react'
import type { ImageName } from '../data/projects'
import { imageProps } from '../lib/images'

interface ImgProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes' | 'loading'
> {
  name: ImageName
  sizes: string
  alt: string
  /** Load immediately instead of when the image is about to scroll into view. */
  priority?: boolean
}

// One observer arms every deferred image about a screen before it is needed, then decodes it
// off the main thread so it paints without a hitch. Width and height are always reserved.
const pending = new WeakMap<Element, () => void>()
let observer: IntersectionObserver | undefined

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        pending.get(entry.target)?.()
        pending.delete(entry.target)
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '100% 0px' },
  )
  return observer
}

/** Responsive WebP with reserved dimensions. Deferred until near the viewport unless `priority`. */
export function Img({ name, sizes, alt, priority = false, ...rest }: ImgProps) {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = ref.current
    if (!img || priority) return
    const props = imageProps(name, sizes)
    pending.set(img, () => {
      img.sizes = props.sizes
      img.srcset = props.srcSet
      img.src = props.src
      img.decode().catch(() => undefined)
    })
    getObserver().observe(img)
    return () => {
      pending.delete(img)
      observer?.unobserve(img)
    }
  }, [name, sizes, priority])

  const { width, height, ...source } = imageProps(name, sizes)
  return priority ? (
    <img {...source} width={width} height={height} alt={alt} decoding="async" {...rest} />
  ) : (
    <img ref={ref} width={width} height={height} alt={alt} decoding="async" {...rest} />
  )
}
