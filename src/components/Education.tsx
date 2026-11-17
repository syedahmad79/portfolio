import { profile } from '../data/profile'

export function Education() {
  const { degree, school, years, location } = profile.education
  return (
    <section
      id="education"
      data-theme="light"
      data-nav="experience"
      aria-labelledby="education-title"
      className="theme-light bg-bg text-fg section"
    >
      <div className="wrap grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p data-reveal className="eyebrow">
            Education
          </p>
          <h2 id="education-title" data-reveal="heading" className="display-m mt-5">
            Where I'm studying.
          </h2>
        </div>
        <div data-reveal className="border-line md:col-span-6 md:col-start-7 border-t pt-6">
          <p className="eyebrow">{years}</p>
          <h3 className="title mt-3">{degree}</h3>
          <p className="muted mt-2">{school}</p>
          <p className="muted text-[0.9375rem]">{location}</p>
        </div>
      </div>
    </section>
  )
}
