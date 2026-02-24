import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PlanetLogo from './PlanetLogo'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Npm: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474C23.214 24 24 23.214 24 22.237V1.763C24 .786 23.214 0 22.237 0H1.763zm7.579 5.051h7.527c1.46 0 2.641 1.182 2.641 2.641v7.527c0 1.46-1.181 2.641-2.641 2.641h-2.147v-6.73h-2.64v6.73H9.342V5.051z" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  ChevronDown: ({ className = '' }) => (
    <svg viewBox="0 0 12 12" fill="none" className={`w-3.5 h-3.5 ${className}`}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  Heart: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-rose-500 inline-block">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
}

// ─── AstraForge Logo mark ──────────────────────────────────────────────────────
function AstraForgeMark({ size = 32 }) {
  return (
     <div className="relative">
                  <PlanetLogo size={54} glow={false} />
                </div>
  )
}

// ─── Footer columns ────────────────────────────────────────────────────────────
const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Features',    href: '/#features' },
      { label: 'How it Works', href: '/#how' },
      { label: 'Download',    href: '/download' },
      { label: 'Roadmap',     href: '/#roadmap' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api-overview' },
      { label: 'GitHub',        href: 'https://github.com/AnshulKhichi11/AstraDB', external: true },
      { label: 'npm',           href: 'https://www.npmjs.com/package/astradb',     external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Sign In',      href: '/signin' },
      { label: 'Sign Up',      href: '/signup' },
      { label: 'Coming Soon',  href: '/coming-soon' },
      { label: 'Contact',      href: 'mailto:contact@astraforge.dev' },
    ],
  },
]

const SOCIAL = [
  { Icon: Icon.Github, href: 'https://github.com/AnshulKhichi11/AstraDB', title: 'GitHub' },
  { Icon: Icon.Npm,    href: 'https://www.npmjs.com/package/astradb',     title: 'npm' },
  { Icon: Icon.Mail,   href: 'mailto:contact@astraforge.dev',             title: 'Email' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ExternalLink({ href, className, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
}

function FooterLink({ href, external, children, className, onClick }) {
  if (!href) return null
  const isMail = href.startsWith('mailto:')
  if (external) return <ExternalLink href={href} className={className}>{children}</ExternalLink>
  if (isMail)   return <a href={href} className={className}>{children}</a>
  return <Link to={href} className={className} onClick={onClick}>{children}</Link>
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const year = useMemo(() => new Date().getFullYear(), [])
  const [openGroup, setOpenGroup] = useState(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => setOpenGroup(null), [location.pathname])

  const handleHashLink = (e, href) => {
    if (!href?.startsWith('/#')) return
    e.preventDefault()
    const id = href.slice(2)
    const scrollToId = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (location.pathname !== '/') { navigate('/'); setTimeout(scrollToId, 320) }
    else scrollToId()
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3500)
  }

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-10 pt-16 pb-10">

        {/* ── Top grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr_1fr_1fr] gap-12 lg:gap-10 mb-14">

          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <AstraForgeMark size={34} />
              <div>
                <div className="font-syne text-[13.5px] font-extrabold tracking-[0.15em] text-slate-900">
                  ASTRAFORGE
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  GUI for AstraDB
                </div>
              </div>
            </Link>

            <p className="text-[13.5px] text-slate-500 leading-[1.8] mb-6 max-w-[360px]">
              Open-source database studio for AstraDB. Built for developers who care about their tools.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 mb-8">
              {SOCIAL.map(s => {
                const SIcon = s.Icon
                return (
                  <a
                    key={s.title}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    title={s.title}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all"
                  >
                    <SIcon />
                  </a>
                )
              })}
            </div>

            {/* Newsletter */}
            <div>
              <div className="font-syne text-[10.5px] font-bold tracking-[0.14em] uppercase text-slate-400 mb-3">
                Product Updates
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-[400px]">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                />
                <button
                  type="submit"
                  className={[
                    'h-10 px-4 rounded-xl font-syne text-[13px] font-bold transition-all flex items-center gap-2 flex-shrink-0',
                    submitted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)]',
                  ].join(' ')}
                >
                  {submitted ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Done
                    </>
                  ) : (
                    <>
                      <Icon.Send />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                No spam — only releases and roadmap updates.
              </p>
            </div>
          </div>

          {/* Desktop link columns */}
          <div className="hidden md:grid md:grid-cols-3 lg:col-span-3 gap-10">
            {COLS.map(col => (
              <div key={col.title}>
                <div className="font-syne text-[10.5px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-5">
                  {col.title}
                </div>
                <ul className="flex flex-col gap-3 list-none">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <FooterLink
                        href={l.href}
                        external={l.external}
                        onClick={e => handleHashLink(e, l.href)}
                        className="inline-flex items-center gap-1.5 text-[13.5px] text-slate-500 hover:text-slate-900 transition-colors group"
                      >
                        {l.label}
                        {l.external && (
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                            <Icon.ArrowUpRight />
                          </span>
                        )}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile accordion */}
          <div className="md:hidden flex flex-col gap-2">
            {COLS.map(col => {
              const open = openGroup === col.title
              return (
                <div key={col.title} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenGroup(open ? null : col.title)}
                    className={[
                      'w-full flex items-center justify-between px-4 py-3.5 transition-colors',
                      open ? 'bg-slate-50' : 'bg-white hover:bg-slate-50',
                    ].join(' ')}
                  >
                    <span className="font-syne text-[12px] font-bold tracking-[0.12em] uppercase text-slate-700">
                      {col.title}
                    </span>
                    <Icon.ChevronDown className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <ul className="px-4 pb-4 pt-1 flex flex-col gap-3 list-none bg-slate-50/60">
                      {col.links.map(l => (
                        <li key={l.label}>
                          <FooterLink
                            href={l.href}
                            external={l.external}
                            onClick={e => handleHashLink(e, l.href)}
                            className="inline-flex items-center gap-1.5 text-[13.5px] text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            {l.label}
                            {l.external && <Icon.ArrowUpRight />}
                          </FooterLink>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="h-px w-full bg-slate-100" />

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6">
          <p className="font-mono text-[11px] text-slate-400 tracking-wide flex items-center gap-1.5 flex-wrap">
            © {year} AstraForge
            <span className="text-slate-300">·</span>
            MIT License
            <span className="text-slate-300">·</span>
            Made with <Icon.Heart /> by Anshul Khichi
          </p>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 list-none">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms',   href: '/terms' },
              { label: 'License', href: '/license' },
            ].map(item => (
              <li key={item.label}>
                <Link to={item.href} className="text-[12px] font-mono text-slate-400 hover:text-slate-700 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}