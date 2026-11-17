// Generates the social preview image and the touch icon from local sources.
import sharp from 'sharp'

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#11151C"/>
<path d="M14.2 11.2c-.5-2-3.1-2.6-5-1.9-2.2.8-2.5 3.2-.5 4.4l3.7 2c2.2 1.2 2.1 3.9-.3 4.8-2.1.8-4.7.1-5.4-2" fill="none" stroke="#F2F2ED" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 23l4.6-13.2L26.2 23" fill="none" stroke="#F2F2ED" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.9 18.6h5.4" stroke="#5178F5" stroke-width="2.8" stroke-linecap="round"/></svg>`
await sharp(Buffer.from(icon), { density: 600 })
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png')

for (const size of [32, 192]) {
  await sharp(Buffer.from(icon), { density: 600 })
    .resize(size, size)
    .png()
    .toFile(`public/favicon-${size}.png`)
}

const art = await sharp('assets-src/cin-galaxy.png')
  .extract({ left: 0, top: 180, width: 2880, height: 1620 })
  .resize({ width: 900, height: 630, fit: 'cover', position: 'centre' })
  .toBuffer()

const text = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="#11151C"/><stop offset="0.42" stop-color="#11151C" stop-opacity="0.92"/><stop offset="1" stop-color="#11151C" stop-opacity="0"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#f)"/>
<g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" fill="#F2F2ED">
<text x="72" y="96" font-size="24" letter-spacing="2" fill="#98A3AF">SYED AHMAD GEELANI</text>
<text x="72" y="330" font-size="92" font-weight="700" letter-spacing="-4">Full-Stack</text>
<text x="72" y="428" font-size="92" font-weight="700" letter-spacing="-4">Developer.</text>
<text x="72" y="522" font-size="28" fill="#98A3AF">Computer Science (AI) undergraduate</text>
<text x="72" y="562" font-size="28" fill="#98A3AF">Founder of Veltr Studio · Kuala Lumpur</text>
</g></svg>`

await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#11151C' } })
  .composite([
    { input: art, left: 300, top: 0 },
    { input: Buffer.from(text), left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/og.png')
console.log('brand assets written')
