import { Link } from '../lib/router'
import { profile } from '../data/profile'
import { TextLink } from './Button'
import { GithubIcon, LinkedinIcon } from './icons'

export function Footer() {
  return (
    <footer data-theme="dark" className="theme-dark bg-bg text-fg border-line border-t">
      <div className="wrap flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            to="/"
            className="group inline-block text-[1.375rem] font-semibold tracking-[-0.03em] transition-[letter-spacing] duration-500 hover:tracking-[-0.01em]"
          >
            {profile.name}
            <span className="text-link transition-opacity duration-300 group-hover:opacity-70">
              .
            </span>
          </Link>
          <p className="muted mt-1">{profile.headline}</p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.9375rem]">
          <li>
            <TextLink
              href={profile.links.github}
              arrow={false}
              className="text-muted hover:text-fg gap-2"
            >
              <GithubIcon size={16} />
              GitHub
            </TextLink>
          </li>
          <li>
            <TextLink
              href={profile.links.linkedin}
              arrow={false}
              className="text-muted hover:text-fg gap-2"
            >
              <LinkedinIcon size={15} />
              LinkedIn
            </TextLink>
          </li>
          <li>
            <TextLink href={profile.links.veltr} className="text-muted hover:text-fg">
              Veltr Studio
            </TextLink>
          </li>
        </ul>
      </div>
      <div className="wrap border-line border-t py-5">
        <p className="eyebrow">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}
