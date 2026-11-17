import { Link } from '../../lib/router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/projects'
import { Button } from '../Button'
import { GithubIcon } from '../icons'

export function ProjectActions({
  project,
  caseStudyLink = true,
}: {
  project: Project
  caseStudyLink?: boolean
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Button href={project.live} icon={<ArrowUpRight size={18} aria-hidden="true" />}>
        <span>
          Live demo<span className="sr-only">: {project.name}</span>
        </span>
      </Button>
      <Button href={project.repo} variant="secondary" icon={<GithubIcon size={17} />}>
        <span>
          Source code<span className="sr-only">: {project.name} on GitHub</span>
        </span>
      </Button>
      {caseStudyLink && (
        <Link
          to={`/projects/${project.slug}`}
          className="link group inline-flex items-center gap-1.5 py-2 font-medium"
        >
          Read case study<span className="sr-only">: {project.name}</span>
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  )
}

export function ProjectLabel({ project }: { project: Project }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span className="text-fg">{project.number}</span>
      <span aria-hidden="true" className="bg-line h-px w-8" />
      <span>{project.category}</span>
    </p>
  )
}

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="border-line grid gap-10 border-t pt-10 md:grid-cols-12 md:gap-8">
      <div data-reveal className="md:col-span-4">
        <h4 className="eyebrow">What it does</h4>
        <ul className="mt-4">
          {project.capabilities.map((item) => (
            <li
              key={item}
              className="border-line border-b py-2.5 text-[0.9375rem] first:pt-0 last:border-b-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div data-reveal className="md:col-span-4">
        <h4 className="eyebrow">Engineering</h4>
        <p className="body muted mt-4">{project.engineering}</p>
      </div>
      <div data-reveal className="md:col-span-3 md:col-start-10">
        <h4 className="eyebrow">Core technologies</h4>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[0.8125rem] md:grid-cols-1">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
