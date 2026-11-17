import { profile } from '../data/profile'
import { TextLink } from './Button'
import { GithubIcon, LinkedinIcon } from './icons'

export function About() {
  const [first, ...rest] = profile.about
  return (
    <section
      id="about"
      data-theme="light"
      data-nav="about"
      aria-labelledby="about-title"
      className="theme-light bg-bg text-fg section"
    >
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p data-reveal className="eyebrow">
            About
          </p>
          <h2 id="about-title" data-reveal="heading" className="display-m mt-5">
            Curious about how software works, and how it feels to use.
          </h2>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal className="lead">
            {first}
          </p>
          <div className="mt-6 grid gap-5">
            {rest.map((paragraph) => (
              <p key={paragraph} data-reveal className="body muted">
                {paragraph}
              </p>
            ))}
          </div>

          <dl data-reveal className="mt-12">
            {profile.facts.map((fact) => (
              <div
                key={fact.label}
                className="border-line grid grid-cols-[6.5rem_1fr] gap-4 border-t py-3.5 text-[0.9375rem] last:border-b"
              >
                <dt className="eyebrow pt-0.5">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p
            data-reveal
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem]"
          >
            <TextLink href={profile.links.github} arrow={false} className="gap-2">
              <GithubIcon size={16} />
              More on GitHub
            </TextLink>
            <TextLink href={profile.links.linkedin} arrow={false} className="gap-2">
              <LinkedinIcon size={15} />
              Connect on LinkedIn
            </TextLink>
          </p>
        </div>
      </div>
    </section>
  )
}
