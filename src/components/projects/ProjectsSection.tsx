import { FramecheckShowcase } from './FramecheckShowcase'
import { ParallelShowcase } from './ParallelShowcase'
import { SynesthesiaShowcase } from './SynesthesiaShowcase'

export function ProjectsSection() {
  return (
    <>
      <section
        id="work"
        data-theme="light"
        data-nav="work"
        aria-labelledby="work-title"
        className="theme-light bg-bg text-fg section"
      >
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p data-reveal className="eyebrow">
                Selected work
              </p>
              <h2 id="work-title" data-reveal="heading" className="display-m mt-5 max-w-[18ch]">
                Three projects, built end to end.
              </h2>
            </div>
            <p data-reveal className="lead muted md:col-span-4">
              Personal projects I designed and engineered myself. Each one runs entirely in the
              browser, with no backend behind it.
            </p>
          </div>
          <div className="mt-14 md:mt-20">
            <FramecheckShowcase />
          </div>
        </div>
      </section>
      <SynesthesiaShowcase />
      <ParallelShowcase />
    </>
  )
}
