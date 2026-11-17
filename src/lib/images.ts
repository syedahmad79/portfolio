import manifest from '../assets/imageManifest.json'
import type { ImageName } from '../data/projects'

export function imageProps(name: ImageName, sizes: string) {
  const entry = manifest[name]
  const mid = entry.widths[Math.min(1, entry.widths.length - 1)] ?? entry.width
  return {
    src: `/img/${name}-${mid}.webp`,
    srcSet: entry.widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(', '),
    sizes,
    width: entry.width,
    height: entry.height,
  }
}
