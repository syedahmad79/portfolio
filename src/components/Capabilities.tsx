import { skillGroups } from '../data/skills'

export function Capabilities() {
  return (
    <section
      id="capabilities"
      data-theme="light"
      data-nav="about"
      aria-labelledby="capabilities-title"
      className="theme-light bg-bg text-fg pb-[var(--section-y)]"
    >
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p data-reveal className="eyebrow">
              Technical capabilities
            </p>
            <h2 id="capabilities-title" data-reveal="heading" className="display-m mt-5">
              The tools behind the work.
            </h2>
          </div>
          <p data-reveal className="muted body md:col-span-4 md:col-start-9">
            Grouped by what I use them for. Groups two to five are the tools used in the projects
            above. Backend and automation are foundations and past work.
          </p>
        </div>

        <div className="mt-14 md:mt-20">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              data-reveal
              className="border-line grid gap-4 border-t py-7 last:border-b md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <h3 className="title">{group.title}</h3>
                <p className="muted mt-1.5 max-w-[22rem] text-[0.875rem]">{group.note}</p>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[1.0625rem] sm:grid-cols-3 md:col-span-8">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
