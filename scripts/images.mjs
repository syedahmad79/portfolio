// Converts the captured screenshots in assets-src/ into responsive WebP files in public/img/
// and writes src/assets/imageManifest.json with the intrinsic sizes used for layout.
import sharp from 'sharp'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const SRC = 'assets-src'
const OUT = 'public/img'

const SHOTS = [
  { name: 'framecheck-ui', file: 'fc-slider.png', widths: [960, 1600, 2400] },
  {
    name: 'framecheck-diff',
    file: 'fc-diff3.png',
    crop: { left: 47, top: 301, width: 2145, height: 1341 },
    widths: [960, 1600],
  },
  { name: 'framecheck-reference', file: 'fc-reference.png', widths: [1280] },
  { name: 'framecheck-implementation', file: 'fc-implementation.png', widths: [1280] },
  { name: 'synesthesia-ui', file: 'syn-landing.png', widths: [960, 1600, 2400] },
  ...['galaxy', 'ocean', 'aurora', 'nebula', 'pulse'].map((w) => ({
    name: `synesthesia-${w}`,
    file: `cin-${w}.png`,
    crop: { left: 0, top: 180, width: 2880, height: 1620 },
    widths: [960, 1600, 2400],
  })),
  {
    name: 'parallel-landing',
    file: 'par-landing.png',
    crop: { left: 0, top: 0, width: 2880, height: 1640 },
    widths: [960, 1600, 2400],
  },
  {
    name: 'parallel-choices',
    file: 'par-c2.png',
    crop: { left: 0, top: 0, width: 2880, height: 1620 },
    widths: [960, 1600, 2400],
  },
  {
    name: 'parallel-ending',
    file: 'par-n4.png',
    crop: { left: 0, top: 0, width: 2880, height: 1620 },
    widths: [960, 1600, 2400],
  },
  { name: 'veltr-home', file: 'veltr-home.png', widths: [640, 1280, 1920] },
]

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })
await mkdir('src/assets', { recursive: true })

const manifest = {}
for (const shot of SHOTS) {
  let base = sharp(join(SRC, shot.file))
  if (shot.crop) base = base.extract(shot.crop)
  const buffer = await base.toBuffer()
  const meta = await sharp(buffer).metadata()
  const sizes = []
  for (const w of shot.widths) {
    const width = Math.min(w, meta.width)
    const info = await sharp(buffer)
      .resize({ width })
      .webp({ quality: 82, effort: 5 })
      .toFile(join(OUT, `${shot.name}-${width}.webp`))
    sizes.push(info.width)
  }
  manifest[shot.name] = { width: meta.width, height: meta.height, widths: [...new Set(sizes)] }
}

await writeFile('src/assets/imageManifest.json', JSON.stringify(manifest, null, 2) + '\n')
console.log(`Wrote ${Object.keys(manifest).length} images to ${OUT}`)
