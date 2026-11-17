// Runs after `vite build`:
// - writes a static HTML entry per case study with its own title and description,
// - fills canonical/Open Graph URLs only when the real site URL is known (SITE_URL, or the
//   URL Netlify provides), and drops those tags otherwise instead of guessing a domain,
// - writes sitemap.xml and the sitemap line of robots.txt under the same condition.
import { mkdir, readdir, readFile, writeFile, appendFile } from 'node:fs/promises'
import seo from '../src/data/seo.json' with { type: 'json' }

const site = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '')
let source = await readFile('dist/index.html', 'utf8')

// Preload the main text face so the hero does not wait for CSS to discover it.
const font = (await readdir('dist/assets')).find((file) =>
  /^geist-latin-wght-normal-.*\.woff2$/.test(file),
)
if (font) {
  const link = `    <link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />\n`
  source = source.replace('  </head>', `${link}  </head>`)
}

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

function setMeta(html, attr, key, content) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`)
  return html.replace(pattern, `$1${escapeAttr(content)}$2`)
}

function finalize(html, { path, title, description }) {
  let out = html
  if (title) {
    out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
    out = setMeta(out, 'property', 'og:title', title)
    out = setMeta(out, 'name', 'twitter:title', title)
  }
  if (description) {
    out = setMeta(out, 'name', 'description', description)
    out = setMeta(out, 'property', 'og:description', description)
    out = setMeta(out, 'name', 'twitter:description', description)
  }
  if (site) {
    out = out
      .replaceAll('%SITE_URL%/og.png', `${site}/og.png`)
      .replaceAll('%SITE_URL%/', `${site}${path}`)
  } else {
    out = out.replace(/[ \t]*<(?:meta|link)\b[^>]*%SITE_URL%[^>]*>\n?/g, '')
  }
  return out
}

await writeFile('dist/index.html', finalize(source, { path: '/' }))

for (const [slug, meta] of Object.entries(seo.projects)) {
  const dir = `dist/projects/${slug}`
  await mkdir(dir, { recursive: true })
  await writeFile(`${dir}/index.html`, finalize(source, { path: `/projects/${slug}/`, ...meta }))
}

if (site) {
  const paths = ['/', ...Object.keys(seo.projects).map((slug) => `/projects/${slug}/`)]
  const urls = paths.map((path) => `  <url><loc>${site}${path}</loc></url>`).join('\n')
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
  await appendFile('dist/robots.txt', `\nSitemap: ${site}/sitemap.xml\n`)
}

console.log(
  site
    ? `Postbuild done for ${site}`
    : 'Postbuild done (no site URL: canonical, OG URLs and sitemap omitted)',
)
