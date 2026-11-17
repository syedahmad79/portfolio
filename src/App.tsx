import { lazy, Suspense } from 'react'
import { LazyMotion, MotionConfig } from 'motion/react'
import { ScrollManager } from './components/ScrollManager'
import { useLocation } from './lib/router'
import Home from './pages/Home'

const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const loadFeatures = () => import('./lib/motionFeatures').then((module) => module.default)

function Routes() {
  const { pathname } = useLocation()
  if (pathname === '/') return <Home />
  const slug = /^\/projects\/([^/]+)\/?$/.exec(pathname)?.[1]
  return <CaseStudy slug={slug} />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <ScrollManager />
        <Suspense fallback={null}>
          <Routes />
        </Suspense>
      </LazyMotion>
    </MotionConfig>
  )
}
