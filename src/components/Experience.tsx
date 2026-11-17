import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { otherRoles, veltr } from '../data/experience'
import { useGsap } from '../hooks/useGsap'
import { gsap } from '../lib/gsap'
import { Button } from './Button'
import { Img } from './Img'

export function Experience() {
  const list = useRef<HTMLOListElement>(null)

  useGsap(list, () => {
    gsap.fromTo(
      '[data-timeline-line]',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: { trigger: list.current, start: 'top 80%', end: 'bottom 65%', scrub: true },
      },
    )
  })

  return (
    <section
      id="experience"
      data-theme="dark"
      data-nav="experience"
      aria-labelledby="experience-title"
      className="theme-dark bg-bg text-fg section"
    >
      <div className="wrap">
        <p data-reveal className="eyebrow">
          Experience
        </p>
        <h2 id="experience-title" data-reveal="heading" className="display-l mt-5 max-w-[16ch]">
          I also run a studio.
        </h2>

        <article
          aria-labelledby="veltr-title"
          className="border-line mt-14 grid gap-10 border-t pt-12 md:mt-20 md:grid-cols-12 md:gap-8 md:pt-16"
        >
          <div className="md:col-span-6">
            <p data-reveal className="eyebrow flex items-center gap-3">
              <span className="text-link">{veltr.role}</span>
              <span aria-hidden="true" className="bg-line h-px w-8" />
              <span>{veltr.period}</span>
            </p>
            <h3 id="veltr-title" data-reveal="heading" className="display-m mt-5">
              {veltr.name}
            </h3>
            <p data-reveal className="lead mt-6">
              {veltr.summary}
            </p>
            <p data-reveal className="body muted mt-4">
              {veltr.ownership}
            </p>
            <ul data-reveal className="mt-8 grid gap-x-6 sm:grid-cols-2">
              {veltr.services.map((service) => (
                <li key={service} className="border-line border-t py-3 text-[0.9375rem]">
                  {service}
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-8">
              <Button href={veltr.url} icon={<ArrowUpRight size={18} aria-hidden="true" />}>
                Visit Veltr Studio
              </Button>
            </div>
          </div>

          <div className="md:col-span-6">
            <div data-mask className="border-line overflow-hidden rounded-[10px] border">
              <div className="border-line flex items-center justify-between border-b px-4 py-2.5">
                <p className="eyebrow">veltr.agency</p>
                <p className="eyebrow">Live site</p>
              </div>
              <Img
                name="veltr-home"
                sizes="(min-width: 1280px) 600px, (min-width: 768px) 46vw, 92vw"
                alt="The Veltr Studio website: a dark page with the headline “Websites and apps. Design and development.” and a particle ring."
                className="h-auto w-full"
              />
            </div>
          </div>
        </article>

        <ol ref={list} className="relative mt-16 md:mt-24" aria-label="Other experience">
          <span
            data-timeline-line
            aria-hidden="true"
            className="bg-line absolute bottom-0 left-0 top-0 w-px"
          />
          {otherRoles.map((role) => (
            <li
              key={role.title}
              data-reveal
              className="grid gap-3 pb-12 pl-6 last:pb-0 md:grid-cols-12 md:gap-8 md:pl-10"
            >
              <p className="eyebrow md:col-span-3 md:pt-1.5">{role.period}</p>
              <div className="md:col-span-7">
                <h3 className="title">{role.title}</h3>
                {role.organisation && (
                  <p className="muted mt-1 text-[0.9375rem]">{role.organisation}</p>
                )}
                <p className="body muted mt-3">{role.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
