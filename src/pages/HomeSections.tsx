import { useRef } from 'react'
import { useScrollMotion } from '../hooks/useScrollMotion'
import { About } from '../components/About'
import { Capabilities } from '../components/Capabilities'
import { Contact } from '../components/Contact'
import { Education } from '../components/Education'
import { Experience } from '../components/Experience'
import { ProjectsSection } from '../components/projects/ProjectsSection'

/** Everything below the hero. Loaded after first paint so the hero stays light. */
export default function HomeSections() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollMotion(ref)
  return (
    <div ref={ref}>
      <ProjectsSection />
      <About />
      <Capabilities />
      <Experience />
      <Education />
      <Contact />
    </div>
  )
}
