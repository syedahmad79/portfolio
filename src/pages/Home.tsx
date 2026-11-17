import { lazy, Suspense } from 'react'
import seo from '../data/seo.json'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Hero } from '../components/Hero'
import { PageShell } from '../components/PageShell'

const HomeSections = lazy(() => import('./HomeSections'))

export default function Home() {
  useDocumentMeta(seo.home.title, seo.home.description)
  return (
    <PageShell>
      <Hero />
      <Suspense fallback={<div aria-hidden="true" className="min-h-[300svh]" />}>
        <HomeSections />
      </Suspense>
    </PageShell>
  )
}
