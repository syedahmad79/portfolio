import { projects } from '../../data/projects'
import { profile } from '../../data/profile'
import { TextLink } from '../Button'
import { GithubIcon } from '../icons'
import { Img } from '../Img'
import { BranchPath } from './BranchPath'
import { ProjectActions, ProjectDetails, ProjectLabel } from './ProjectParts'

const project = projects[2]!

export function ParallelShowcase() {
  return (
    <section
      id="parallel"
      data-theme="dark"
      data-nav="work"
      aria-labelledby="parallel-title"
      className="theme-dark bg-bg text-fg relative overflow-clip border-t border-line"
    >
      <div className="wrap py-[var(--section-y)]">
        <div data-reveal>
          <ProjectLabel project={project} />
        </div>
        <h3
          id="parallel-title"
          data-reveal="heading"
          className="mt-6 text-[clamp(2.75rem,0.5rem+10.5vw,9.5rem)] font-light uppercase leading-[0.95] tracking-[0.04em]"
        >
          {project.name}
        </h3>

        <div className="mt-12 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p data-reveal className="title text-fg">
              Explore the Lives You Never Lived.
            </p>
            <p data-reveal className="lead muted mt-6">
              {project.summary}
            </p>
            <div data-reveal className="mt-8">
              <ProjectActions project={project} />
            </div>
          </div>
          <div data-reveal className="md:col-span-6 md:col-start-7">
            <BranchPath />
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12 md:gap-6">
          <div
            data-mask
            className="border-line overflow-hidden rounded-[10px] border md:col-span-7"
          >
            <Img
              name="parallel-choices"
              sizes="(min-width: 1280px) 720px, (min-width: 768px) 58vw, 92vw"
              alt="PARALLEL mid-story: three choices for the third decision, with the timeline of earlier decisions on the right."
              className="h-auto w-full"
            />
          </div>
          <div
            data-mask
            className="border-line overflow-hidden rounded-[10px] border md:col-span-5 md:mt-24"
          >
            <Img
              name="parallel-ending"
              sizes="(min-width: 1280px) 510px, (min-width: 768px) 42vw, 92vw"
              alt="The ending screen for the Move Abroad story, listing the decisions along the path."
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <ProjectDetails project={project} />
        </div>

        <div
          data-reveal
          className="border-line mt-20 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-28"
        >
          <p className="title">Want to see more? The rest of my repositories are on GitHub.</p>
          <TextLink href={profile.links.github} arrow={false} className="gap-2 whitespace-nowrap">
            <GithubIcon size={17} />
            github.com/syedahmad79
          </TextLink>
        </div>
      </div>
    </section>
  )
}
