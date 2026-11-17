import { projects } from '../../data/projects'
import { CompareSlider } from './CompareSlider'
import { ProjectActions, ProjectDetails, ProjectLabel } from './ProjectParts'

const project = projects[0]!

export function FramecheckShowcase() {
  return (
    <article aria-labelledby="framecheck-title">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <div data-reveal>
            <ProjectLabel project={project} />
          </div>
          <h3 id="framecheck-title" data-reveal="heading" className="display-l mt-5">
            {project.name}
          </h3>
        </div>
        <div data-reveal className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <p className="lead">{project.summary}</p>
        </div>
      </div>

      <div data-reveal className="mt-8">
        <ProjectActions project={project} />
      </div>

      <div className="mt-12 md:mt-16">
        <CompareSlider />
      </div>

      <div className="mt-14 md:mt-20">
        <ProjectDetails project={project} />
      </div>
    </article>
  )
}
