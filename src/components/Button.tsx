import type { ComponentProps, ReactNode } from 'react'
import { m } from 'motion/react'
import { Link } from '../lib/router'
import { ArrowUpRight } from 'lucide-react'

const MotionLink = m.create(Link)

type Variant = 'primary' | 'secondary'

const base =
  'group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-200'
const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg hover:bg-fg/85',
  secondary: 'border border-line text-fg hover:border-fg/40 hover:bg-fg/5',
}

const feedback = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 520, damping: 32 },
} as const

type ButtonProps = {
  variant?: Variant
  icon?: ReactNode
  className?: string
  children: ReactNode
} & ({ href: string; to?: never } | { to: string; href?: never })

/** Pill button. `href` opens in a new tab, `to` navigates inside the app. */
export function Button({
  variant = 'primary',
  icon,
  className = '',
  children,
  ...target
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`
  const { to, href = '' } = target
  if (to) {
    return (
      <MotionLink to={to} className={classes} {...feedback}>
        {children}
        {icon}
      </MotionLink>
    )
  }
  const external = !href.startsWith('mailto:')
  return (
    <m.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={classes}
      {...feedback}
    >
      {icon}
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </m.a>
  )
}

type TextLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string; arrow?: boolean }

/** Inline external link with a drawn underline and a nudging arrow. */
export function TextLink({ href, arrow = true, className = '', children, ...rest }: TextLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link group inline-flex items-center gap-1 font-medium ${className}`}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
