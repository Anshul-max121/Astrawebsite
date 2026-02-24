import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PlanetLogo from './PlanetLogo'
import { useAuth } from '@/context/AuthContext'
import { NAV_LINKS } from '@/utils/constants'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = {
  ChevronDown: ({ className = '' }) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  BookOpen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  LogOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Terminal: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  // Feature icons
  Database: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Table: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Wifi: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0119 12.55" />
      <path d="M5 12.55a10.94 10.94 0 015.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0122.56 9" />
      <path d="M1.42 9a15.91 15.91 0 014.7-2.88" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Package: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Server: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Link: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  BarChart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Cloud: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
}

// ─── Mega Menu Data ────────────────────────────────────────────────────────────
const MEGA_MENUS = {
  Features: {
    headline: 'Everything you need to manage AstraDB',
    items: [
      { Icon: Icon.Database,  title: 'Visual Explorer',   desc: 'Tree sidebar for all databases & collections',  href: '/features#explorer' },
      { Icon: Icon.Table,     title: 'Table & JSON Views', desc: 'Switch between spreadsheet and raw JSON',       href: '/features#views' },
      { Icon: Icon.Edit,      title: 'Full CRUD',          desc: 'Insert, edit, delete with JSON validation',    href: '/features#crud' },
      { Icon: Icon.Wifi,      title: 'Offline Cache',      desc: 'Data stays visible when server is offline',    href: '/features#cache' },
      { Icon: Icon.Search,    title: 'Live Search',        desc: 'Filter documents across all fields instantly', href: '/features#search' },
      { Icon: Icon.Package,   title: 'One-line Install',   desc: 'npm install — right binary, every platform',   href: '/features#install' },
    ],
    cta: { label: 'See all features', href: '/features' },
  },
  'How it works': {
    headline: 'Up and running in under 2 minutes',
    items: [
      { Icon: Icon.Package,   title: 'Install AstraDB',     desc: 'npm install -g astradb in your terminal',     href: '/how-it-works#install' },
      { Icon: Icon.Server,    title: 'Start the server',    desc: 'astradb start → localhost:8080 instantly',    href: '/how-it-works#start' },
      { Icon: Icon.Download,  title: 'Download AstraForge', desc: 'GUI for Windows, macOS and Linux',            href: '/how-it-works#download' },
      { Icon: Icon.Link,      title: 'Connect & Explore',   desc: 'Enter host + port, click Connect — done',     href: '/how-it-works#connect' },
    ],
    cta: { label: 'Full guide', href: '/how-it-works' },
  },
  Roadmap: {
    headline: "What's coming next",
    items: [
      { Icon: Icon.Lock,     title: 'Auth & Users',        desc: 'Role-based access, API key management',        href: '/roadmap#auth',    badge: 'Soon' },
      { Icon: Icon.BarChart, title: 'Metrics Dashboard',   desc: 'Real-time charts for query performance',       href: '/roadmap#metrics', badge: 'Soon' },
      { Icon: Icon.Cloud,    title: 'AstraCloud',          desc: 'Managed cloud — deploy in one click',          href: '/roadmap#cloud',   badge: 'Soon' },
      { Icon: Icon.Users,    title: 'Team Workspaces',     desc: 'Share connections, collaborate in real-time',  href: '/roadmap#teams',   badge: 'Planned' },
    ],
    cta: { label: 'Full roadmap', href: '/roadmap' },
  },
}

const BADGE_COLORS = {
  Soon:    'bg-amber-50 border-amber-200 text-amber-700',
  Planned: 'bg-slate-100 border-slate-200 text-slate-500',
  Beta:    'bg-blue-50 border-blue-200 text-blue-700',
}

// ─── AstraForge Logo mark ──────────────────────────────────────────────────────
function AstraForgeMark({ size = 32 }) {
  return (
            <div className="relative">
              <PlanetLogo size={54} glow={false} />
            </div>


  )
}

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false)
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [activeMenu, setActiveMenu]       = useState(null)
  const [userMenuOpen, setUserMenuOpen]   = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)

  const { user, signOut } = useAuth()
  const location  = useLocation()
  const navigate  = useNavigate()

  const userMenuRef = useRef(null)
  const navRef      = useRef(null)
  const closeTimer  = useRef(null)

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close on route change
  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
    setUserMenuOpen(false)
    setMobileExpanded(null)
  }, [location.pathname])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Outside click / ESC
  useEffect(() => {
    const onDown = e => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
      if (navRef.current && !navRef.current.contains(e.target)) setActiveMenu(null)
    }
    const onKey = e => {
      if (e.key === 'Escape') { setUserMenuOpen(false); setMobileOpen(false); setActiveMenu(null) }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [])

  // Mega menu hover
  const openMenu  = (label) => { clearTimeout(closeTimer.current); setActiveMenu(label) }
  const closeMenu = ()      => { closeTimer.current = setTimeout(() => setActiveMenu(null), 120) }
  const stayOpen  = ()      => clearTimeout(closeTimer.current)

  // Hash scroll
  const handleNavClick = (e, href) => {
    if (!href?.startsWith('/#')) return
    e.preventDefault()
    const id = href.slice(2)
    const scrollToId = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (location.pathname !== '/') { navigate('/'); setTimeout(scrollToId, 320) }
    else scrollToId()
    setMobileOpen(false)
  }

  const isActive = href => {
    if (href.startsWith('/#')) return location.pathname === '/'
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  const navLinks = useMemo(() => NAV_LINKS ?? [], [])
  const hasMega  = label => !!MEGA_MENUS[label]

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={[
          'fixed top-0 left-0 right-0 z-[900]',
          'h-[64px] md:h-[68px]',
          'transition-all duration-300',
          scrolled
            ? 'bg-white/96 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.06)]'
            : 'bg-white/80 backdrop-blur-sm',
        ].join(' ')}
      >
        <div className="h-full w-full max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-10 flex items-center justify-between gap-4">

          {/* ── Brand ─────────────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <AstraForgeMark size={32} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-syne text-[13px] font-extrabold tracking-[0.15em] text-slate-900 whitespace-nowrap">
                  ASTRAFORGE
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-[0.08em] uppercase text-blue-700 bg-blue-50 border border-blue-100">
                  Beta
                </span>
              </div>
              <div className="hidden lg:block text-[10px] text-slate-400 mt-0.5 font-mono leading-none">
                GUI for AstraDB
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map(link => {
              const mega = hasMega(link.label)
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => mega ? openMenu(link.label) : null}
                  onMouseLeave={() => mega ? closeMenu() : null}
                >
                  {mega ? (
                    <button
                      onClick={() => setActiveMenu(v => v === link.label ? null : link.label)}
                      className={[
                        'flex items-center gap-1.5 px-3.5 py-2 rounded-xl',
                        'font-syne text-[13px] font-semibold tracking-wide transition-all duration-150',
                        activeMenu === link.label || isActive(link.href)
                          ? 'text-slate-900 bg-slate-100'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50',
                      ].join(' ')}
                    >
                      {link.label}
                      <Icon.ChevronDown className={`transition-transform duration-200 text-slate-400 ${activeMenu === link.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={e => handleNavClick(e, link.href)}
                      className={[
                        'flex items-center px-3.5 py-2 rounded-xl',
                        'font-syne text-[13px] font-semibold tracking-wide transition-all duration-150',
                        isActive(link.href)
                          ? 'text-slate-900 bg-slate-100'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50',
                      ].join(' ')}
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              )
            })}
          </div>

          {/* ── Desktop Right ─────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-[0_1px_6px_rgba(15,23,42,0.05)]"
                >
                  {user.avatar?.startsWith('http') ? (
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-xl object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-syne text-[12px] font-bold text-white">
                      {user.avatar || user.firstName?.[0] || '?'}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-syne text-[12px] font-bold text-slate-900 leading-tight max-w-[120px] truncate">{user.name}</div>
                    <div className="font-mono text-[10px] text-slate-400 leading-tight max-w-[120px] truncate">{user.email}</div>
                  </div>
                  <Icon.ChevronDown className={`text-slate-400 transition-transform ml-0.5 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-[0_16px_40px_rgba(15,23,42,0.10)] overflow-hidden"
                    >
                      <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/80">
                        <div className="text-[10.5px] font-mono font-semibold text-slate-400 uppercase tracking-[0.1em] mb-1">Signed in as</div>
                        <div className="font-syne text-[13px] font-bold text-slate-900 truncate">{user.name}</div>
                        <div className="font-mono text-[11px] text-slate-400 truncate">{user.email}</div>
                      </div>
                      <div className="p-1.5">
                        {[
                          { label: 'Settings',      href: '/settings',  Ico: Icon.Settings },
                          { label: 'Documentation', href: '/docs',      Ico: Icon.BookOpen },
                        ].map(item => (
                          <Link key={item.href} to={item.href}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-syne font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                            <item.Ico />
                            {item.label}
                          </Link>
                        ))}
                        <div className="h-px bg-slate-100 my-1.5" />
                        <button onClick={signOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-syne font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                          <Icon.LogOut />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/signin"
                  className="h-9 px-4 rounded-xl font-syne text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center">
                  Sign in
                </Link>
                <Link to="/download"
                  className="h-9 px-4 rounded-xl font-syne text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2 shadow-[0_4px_12px_rgba(37,99,235,0.28)]">
                  <Icon.Download />
                  Download
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile right ──────────────────────────────────────────── */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/download"
              className="h-9 px-3.5 rounded-xl font-syne text-[12.5px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-[0_4px_12px_rgba(37,99,235,0.25)]">
              <Icon.Download />
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">Get</span>
            </Link>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center gap-[5px] hover:bg-slate-50 transition-all"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-slate-700 rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Mega Menu Dropdown ──────────────────────────────────────────── */}
        <AnimatePresence>
          {activeMenu && MEGA_MENUS[activeMenu] && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={stayOpen}
              onMouseLeave={closeMenu}
              className="absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.09)]"
            >
              <div className="w-full max-w-[1400px] mx-auto px-6 xl:px-10 py-7">
                <div className="flex gap-10">
                  {/* Left: headline + CTA */}
                  <div className="w-[200px] flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <div className="text-[10.5px] font-mono font-bold tracking-[0.14em] uppercase text-blue-600 mb-2">
                        {activeMenu}
                      </div>
                      <p className="font-syne text-[16px] font-extrabold text-slate-900 leading-[1.35]">
                        {MEGA_MENUS[activeMenu].headline}
                      </p>
                    </div>
                    <Link
                      to={MEGA_MENUS[activeMenu].cta.href}
                      className="mt-6 inline-flex items-center gap-1.5 font-syne text-[12.5px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {MEGA_MENUS[activeMenu].cta.label}
                      <Icon.ArrowRight />
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="w-px bg-slate-100 flex-shrink-0" />

                  {/* Items grid */}
                  <div className="flex-1 grid grid-cols-2 xl:grid-cols-3 gap-1">
                    {MEGA_MENUS[activeMenu].items.map((item, i) => {
                      const ItemIcon = item.Icon
                      return (
                        <Link
                          key={i}
                          to={item.href}
                          className="flex items-start gap-3 px-3.5 py-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:border-blue-100 group-hover:shadow-sm transition-all">
                            <ItemIcon />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-syne text-[13px] font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold border ${BADGE_COLORS[item.badge] || BADGE_COLORS.Planned}`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-[11.5px] text-slate-500 leading-[1.5]">{item.desc}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Mobile Menu Overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[850] bg-slate-900/20 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[900] w-[min(340px,90vw)] bg-white shadow-[-20px_0_60px_rgba(15,23,42,0.12)] lg:hidden flex flex-col"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-5 h-[64px] border-b border-slate-100 flex-shrink-0">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                  <AstraForgeMark size={28} />
                  <span className="font-syne text-[12.5px] font-extrabold tracking-[0.14em] text-slate-900">ASTRAFORGE</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <Icon.Close />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto py-4 px-4">

                {/* User card */}
                {user && (
                  <div className="mb-4 p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                    {user.avatar?.startsWith('http') ? (
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-syne text-[15px] font-bold text-white flex-shrink-0">
                        {user.avatar || user.firstName?.[0]}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-syne text-[13px] font-bold text-slate-900 truncate">{user.name}</div>
                      <div className="font-mono text-[11px] text-slate-400 truncate">{user.email}</div>
                    </div>
                    <button
                      onClick={() => { signOut(); setMobileOpen(false) }}
                      className="flex-shrink-0 flex items-center gap-1.5 text-[12px] font-syne font-semibold text-rose-600 px-2.5 py-1.5 rounded-xl hover:bg-rose-50 transition-colors"
                    >
                      <Icon.LogOut />
                    </button>
                  </div>
                )}

                {/* Nav links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map(link => {
                    const mega = hasMega(link.label)
                    const open = mobileExpanded === link.label

                    if (mega) {
                      return (
                        <div key={link.label} className="rounded-2xl overflow-hidden border border-slate-100">
                          <button
                            onClick={() => setMobileExpanded(open ? null : link.label)}
                            className={[
                              'w-full flex items-center justify-between px-4 py-3.5',
                              'font-syne text-[14px] font-semibold transition-colors',
                              open ? 'text-blue-700 bg-blue-50' : 'text-slate-800 bg-white hover:bg-slate-50',
                            ].join(' ')}
                          >
                            {link.label}
                            <Icon.ChevronDown className={`transition-transform duration-200 ${open ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                          </button>

                          <AnimatePresence>
                            {open && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div className="px-2 pb-2 pt-1 bg-slate-50 flex flex-col gap-0.5">
                                  {MEGA_MENUS[link.label].items.map((item, i) => {
                                    const ItemIcon = item.Icon
                                    return (
                                      <Link key={i} to={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white transition-colors group"
                                      >
                                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 group-hover:text-blue-600 transition-colors shadow-sm">
                                          <ItemIcon />
                                        </div>
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-1.5">
                                            <span className="font-syne text-[13px] font-semibold text-slate-800">{item.title}</span>
                                            {item.badge && (
                                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${BADGE_COLORS[item.badge] || ''}`}>
                                                {item.badge}
                                              </span>
                                            )}
                                          </div>
                                          <p className="font-mono text-[11px] text-slate-400 truncate">{item.desc}</p>
                                        </div>
                                      </Link>
                                    )
                                  })}
                                  <Link to={MEGA_MENUS[link.label].cta.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12.5px] font-syne font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                                  >
                                    {MEGA_MENUS[link.label].cta.label}
                                    <Icon.ArrowRight />
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    }

                    return (
                      <a key={link.href} href={link.href}
                        onClick={e => { handleNavClick(e, link.href); setMobileOpen(false) }}
                        className={[
                          'flex items-center px-4 py-3.5 rounded-2xl',
                          'font-syne text-[14px] font-semibold transition-colors',
                          isActive(link.href) ? 'text-blue-700 bg-blue-50' : 'text-slate-800 hover:bg-slate-50',
                        ].join(' ')}
                      >
                        {link.label}
                      </a>
                    )
                  })}
                </nav>

                {/* Quick start block */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon.Terminal />
                    <span className="font-syne text-[11px] font-bold tracking-[0.1em] uppercase text-slate-400">Quick Start</span>
                  </div>
                  <code className="font-mono text-[12.5px] text-emerald-400 block mb-3">npm install -g astradb</code>
                  <Link to="/docs" onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-1.5 font-syne text-[12.5px] font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    Read the docs
                    <Icon.ArrowRight />
                  </Link>
                </div>
              </div>

              {/* Mobile footer */}
              {!user && (
                <div className="p-4 border-t border-slate-100 flex gap-2 flex-shrink-0">
                  <Link to="/signin" onClick={() => setMobileOpen(false)}
                    className="flex-1 h-11 rounded-2xl border border-slate-200 font-syne text-[14px] font-bold text-slate-800 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}
                    className="flex-1 h-11 rounded-2xl bg-blue-600 font-syne text-[14px] font-bold text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-[0_4px_12px_rgba(37,99,235,0.28)]">
                    Sign Up
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}