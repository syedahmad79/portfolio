import type { ReactNode } from 'react'
import { m } from 'motion/react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { Button } from './Button'
import { GithubIcon, LinkedinIcon } from './icons'

interface Channel {
  label: string
  action: string
  detail: string
  href: string
  icon: ReactNode
  external: boolean
}

const channels: Channel[] = [
  {
    label: 'Email',
    action: 'Send an email',
    detail: profile.email,
    href: `mailto:${profile.email}`,
    icon: <Mail size={20} aria-hidden="true" />,
    external: false,
  },
  {
    label: 'GitHub',
    action: 'View my repositories',
    detail: 'github.com/syedahmad79',
    href: profile.links.github,
    icon: <GithubIcon size={20} />,
    external: true,
  },
  {
    label: 'LinkedIn',
    action: 'Connect on LinkedIn',
    detail: 'in/syedahmadgeelani',
    href: profile.links.linkedin,
    icon: <LinkedinIcon size={19} />,
    external: true,
  },
  {
    label: 'Veltr Studio',
    action: 'Visit Veltr Studio',
    detail: 'veltr.agency',
    href: profile.links.veltr,
    icon: (
      <span aria-hidden="true" className="font-mono text-sm font-semibold">
        V
      </span>
    ),
    external: true,
  },
]

const card = {
  rest: { y: 0 },
  hover: { y: -3 },
}
const arrow = {
  rest: { x: 0, y: 0 },
  hover: { x: 3, y: -3 },
}

function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <m.a
      href={channel.href}
      {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      variants={card}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      className="border-line bg-raised hover:border-link/60 focus-visible:border-link/60 group flex h-full min-h-36 flex-col md:min-h-44 justify-between rounded-lg border p-5 transition-colors duration-300"
    >
      <span className="flex items-center justify-between">
        <span className="text-muted group-hover:text-fg flex items-center gap-2.5 transition-colors duration-300">
          {channel.icon}
          <span className="eyebrow !text-inherit">{channel.label}</span>
        </span>
        <m.span
          variants={arrow}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          className="text-link"
        >
          <ArrowUpRight size={18} aria-hidden="true" />
        </m.span>
      </span>
      <span>
        <span className="title block">{channel.action}</span>
        <span className="muted mt-1 block break-all font-mono text-[0.8125rem]">
          {channel.detail}
        </span>
      </span>
      {channel.external && <span className="sr-only"> (opens in a new tab)</span>}
    </m.a>
  )
}

export function Contact() {
  return (
    <section
      id="contact"
      data-theme="dark"
      data-nav="contact"
      aria-labelledby="contact-title"
      className="theme-dark bg-bg text-fg relative isolate overflow-clip"
    >
      <div
        aria-hidden="true"
        className="tech-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_45%,black)]"
      />
      <div className="wrap section">
        <p data-reveal className="eyebrow">
          Contact
        </p>
        <h2 id="contact-title" data-reveal="heading" className="display-xl mt-5 max-w-[14ch]">
          Have something interesting in mind?
        </h2>
        <p data-reveal className="lead muted mt-8 max-w-[34rem]">
          I'm open to software engineering opportunities, internships, and interesting
          collaborations.
        </p>
        <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={`mailto:${profile.email}`} icon={<Mail size={18} aria-hidden="true" />}>
            Get in Touch
          </Button>
          <p className="muted font-mono text-[0.875rem] sm:ml-3">{profile.email}</p>
        </div>

        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-24">
          {channels.map((channel) => (
            <li key={channel.label} data-reveal>
              <ChannelCard channel={channel} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
