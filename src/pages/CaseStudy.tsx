import { useRef, type ReactNode } from 'react'
import { Link } from '../lib/router'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { getProject, projects, type Project } from '../data/projects'
import seo from '../data/seo.json'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useScrollMotion } from '../hooks/useScrollMotion'
import { Button } from '../components/Button'
import { Img } from '../components/Img'
import { PageShell } from '../components/PageShell'
import { GithubIcon } from '../components/icons'
import { ProjectActions, ProjectLabel } from '../components/projects/ProjectParts'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-line grid gap-6 border-t py-10 md:grid-cols-12 md:gap-8 md:py-14">
      <h2 data-reveal className="eyebrow md:col-span-3 md:pt-1.5">
        {title}
      </h2>
      <div data-reveal className="md:col-span-8 md:col-start-5">
        {children}
      </div>
    </div>
  )
}

function NotFound() {
  useDocumentMeta('Page not found | Syed Ahmad Geelani', 'This page does not exist.')
  return (
    <PageShell>
      <section data-theme="light" className="theme-light bg-bg text-fg section pt-40 md:pt-52">
        <div className="wrap">
          <p className="eyebrow">404</p>
          <h1 className="display-l mt-5">That page does not exist.</h1>
          <div className="mt-8">
            <Button to="/">Back to the portfolio</Button>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function Study({ project }: { project: Project }) {
  const meta = seo.projects[project.slug]
  useDocumentMeta(meta.title, meta.description)
  const { caseStudy } = project
  const [lead, ...gallery] = caseStudy.gallery
  const index = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(index + 1) % projects.length]!
  const scope = useRef<HTMLDivElement>(null)
  useScrollMotion(scope)

  return (
    <PageShell>
      <div ref={scope}>
        <section
          data-theme="light"
          aria-labelledby="study-title"
          className="theme-light bg-bg text-fg pt-32 md:pt-44"
        >
          <div className="wrap">
            <Link
              to="/#work"
              className="link text-muted group inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              All work
            </Link>
            <div className="mt-10">
              <ProjectLabel project={project} />
            </div>
            <h1 id="study-title" data-reveal="heading" className="display-xl mt-5">
              {project.name}
            </h1>
            <div className="mt-8 grid gap-8 md:grid-cols-12">
              <p data-reveal className="lead md:col-span-7">
                {project.summary}
              </p>
            </div>
            <div data-reveal className="mt-8">
              <ProjectActions project={project} caseStudyLink={false} />
            </div>
            {lead && (
              <div
                data-mask
                className="border-line mt-14 overflow-hidden rounded-[10px] border md:mt-20"
              >
                <Img
                  name={lead.image}
                  sizes="(min-width: 1280px) 1184px, 92vw"
                  alt={lead.alt}
                  priority
                  className="h-auto w-full"
                />
              </div>
            )}
          </div>
        </section>

        <section data-theme="light" className="theme-light bg-bg text-fg section pb-10 md:pb-16">
          <div className="wrap">
            <Block title="Overview">
              {caseStudy.overview.map((paragraph, i) => (
                <p key={paragraph} className={i === 0 ? 'lead' : 'body muted mt-5'}>
                  {paragraph}
                </p>
              ))}
            </Block>
            <Block title="Objective">
              <p className="lead">{caseStudy.objective}</p>
            </Block>
            <Block title="Technical approach">
              <ol>
                {caseStudy.approach.map((item, i) => (
                  <li
                    key={item.title}
                    className="border-line grid gap-2 border-b py-6 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[3rem_1fr]"
                  >
                    <span className="eyebrow pt-1.5">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="title">{item.title}</h3>
                      <p className="body muted mt-2">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>
            <Block title="Key features">
              <ul>
                {caseStudy.features.map((feature) => (
                  <li
                    key={feature}
                    className="border-line border-b py-3.5 first:pt-0 last:border-b-0"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Verified stack">
              <p className="body muted">
                Checked against the project's dependency manifest and source.
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 font-mono text-[0.875rem] sm:grid-cols-3">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Block>
            <Block title="Limits and honest notes">
              <ul>
                {caseStudy.limits.map((limit) => (
                  <li
                    key={limit}
                    className="border-line body muted border-b py-4 first:pt-0 last:border-b-0"
                  >
                    {limit}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </section>

        {gallery.length > 0 && (
          <section
            data-theme="light"
            aria-label="Screenshots"
            className="theme-light bg-bg text-fg pb-24 md:pb-36"
          >
            <div className="wrap grid gap-6 md:grid-cols-2">
              {gallery.map((item, i) => (
                <div
                  key={item.image}
                  data-mask
                  className={`border-line overflow-hidden rounded-[10px] border ${
                    gallery.length === 1
                      ? 'md:col-span-2'
                      : gallery.length === 3 && i === 0
                        ? 'md:col-span-2'
                        : ''
                  }`}
                >
                  <Img
                    name={item.image}
                    sizes="(min-width: 1280px) 600px, 92vw"
                    alt={item.alt}
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section data-theme="dark" aria-label="Links" className="theme-dark bg-bg text-fg section">
          <div className="wrap">
            <p data-reveal className="eyebrow">
              {project.name}
            </p>
            <h2 data-reveal="heading" className="display-m mt-5 max-w-[18ch]">
              See it running, or read the code.
            </h2>
            <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={project.live} icon={<ArrowUpRight size={18} aria-hidden="true" />}>
                Live demo
              </Button>
              <Button href={project.repo} variant="secondary" icon={<GithubIcon size={17} />}>
                Source on GitHub
              </Button>
            </div>
            <Link
              to={`/projects/${next.slug}`}
              data-reveal
              className="border-line group mt-16 flex items-center justify-between gap-6 border-t pt-8 md:mt-24"
            >
              <span>
                <span className="eyebrow block">Next project</span>
                <span className="display-m mt-2 block">{next.name}</span>
              </span>
              <ArrowRight
                size={28}
                aria-hidden="true"
                className="text-link transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  )
}

export default function CaseStudy({ slug }: { slug?: string }) {
  const project = getProject(slug)
  return project ? <Study project={project} /> : <NotFound />
}
