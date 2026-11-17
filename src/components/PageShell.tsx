import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Nav } from './Nav'

/** Navigation, main landmark and footer shared by every page. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}
