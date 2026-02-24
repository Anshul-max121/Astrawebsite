import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PlanetLogo from '@/components/PlanetLogo'

/* ─── SVG Icons ────────────────────────────────────────────────────────────── */
const Icon = {
  Construction: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <path d="M12 12h.01"/>
      <path d="M17 12h.01"/>
      <path d="M7 12h.01"/>
    </svg>
  ),
  Mail: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  ArrowRight: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  ArrowLeft: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Github: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Download: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Compass: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  Map: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
      <line x1="8" y1="2" x2="8" y2="18"/>
      <line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  ),
  Home: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
}

/* ════════════════════════════════════════════════════════════════════════════
   COMING SOON PAGE
════════════════════════════════════════════════════════════════════════════ */
export function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [done,  setDone]  = useState(false)

  const submit = e => {
    e.preventDefault()
    if (email) setDone(true)
  }

  const COMING_FEATURES = [
    'AstraCloud managed hosting',
    'Team workspaces & collaboration',
    'Browser-based web interface',
    'Plugin system & themes',
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-8 relative overflow-hidden bg-[#05050a]">

      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 35%, rgba(109,40,217,0.18) 0%, transparent 65%)' }} />
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent 75%)' }} />

      {/* Floating orbs */}
      <div aria-hidden className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 65%)', filter: 'blur(40px)', animation: 'pulse 4s ease-in-out infinite' }} />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.10), transparent 65%)', filter: 'blur(32px)', animation: 'pulse 5s ease-in-out infinite 1s' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[600px] text-center">

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-[26px] mb-8 mx-auto"
          style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.20)', boxShadow: '0 0 60px rgba(124,58,237,0.22)' }}>
          <PlanetLogo size={56} />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-[11px] tracking-[0.09em] mb-6"
          style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.22)', color: '#fbbf24' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Under Construction
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-syne font-extrabold tracking-tight leading-[1.1] mb-4 text-white"
          style={{ fontSize: 'clamp(30px, 6vw, 52px)' }}>
          Something{' '}
          <span style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            big
          </span>{' '}
          is coming
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="text-[16px] leading-[1.75] mb-8"
          style={{ color: '#a1a1aa' }}>
          We're working hard on the next version of AstraForge.<br className="hidden sm:block" />
          Enter your email to be the first to know when it's ready.
        </motion.p>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34 }}
          className="grid grid-cols-2 gap-2 max-w-[420px] mx-auto mb-9">
          {COMING_FEATURES.map(f => (
            <div key={f} className="flex items-center gap-2 text-left px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>
                <Icon.Check size={9} />
              </div>
              <span className="font-mono text-[10.5px]" style={{ color: '#71717a' }}>{f}</span>
            </div>
          ))}
        </motion.div>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          {!done ? (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 max-w-[420px] mx-auto mb-8">
              <div className="flex-1 flex items-center gap-2.5 px-4 h-11 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <Icon.Mail size={14} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 bg-transparent font-mono text-[13px] text-white placeholder:text-zinc-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-6 rounded-xl font-syne text-[13.5px] font-bold text-white flex items-center justify-center gap-2 flex-shrink-0 transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }}>
                Notify Me
                <Icon.ArrowRight size={13} />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[420px] mx-auto mb-8 flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.22)' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399' }}>
                <Icon.Check size={11} />
              </div>
              <span className="font-syne text-[13.5px] font-semibold" style={{ color: '#34d399' }}>
                You're on the list! We'll email you when it's ready.
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="flex flex-wrap items-center justify-center gap-5">
          <Link to="/"
            className="inline-flex items-center gap-1.5 font-syne text-[13px] font-semibold transition-colors"
            style={{ color: '#52525b' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
            onMouseLeave={e => e.currentTarget.style.color = '#52525b'}>
            <Icon.ArrowLeft size={12} />
            Back to home
          </Link>
          <div style={{ color: '#27272a' }}>·</div>
          <a
            href="https://github.com/AnshulKhichi11/AstraDB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-syne text-[13px] font-semibold transition-colors"
            style={{ color: '#52525b' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
            onMouseLeave={e => e.currentTarget.style.color = '#52525b'}>
            <Icon.Github size={13} />
            Follow on GitHub
          </a>
          <div style={{ color: '#27272a' }}>·</div>
          <Link to="/download"
            className="inline-flex items-center gap-1.5 font-syne text-[13px] font-semibold transition-colors"
            style={{ color: '#52525b' }}
            onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
            onMouseLeave={e => e.currentTarget.style.color = '#52525b'}>
            <Icon.Download size={13} />
            Download v1.0
          </Link>
        </motion.div>

      </motion.div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   NOT FOUND PAGE
════════════════════════════════════════════════════════════════════════════ */
export function NotFoundPage() {
  const QUICK_LINKS = [
    { label: 'Home',         to: '/',            Icon: Icon.Home     },
    { label: 'Features',     to: '/features',    Icon: Icon.Compass  },
    { label: 'Download',     to: '/download',    Icon: Icon.Download },
    { label: 'How it works', to: '/how-it-works', Icon: Icon.Map     },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-8 bg-[#05050a] text-center relative overflow-hidden">

      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(59,130,246,0.10) 0%, transparent 60%)' }} />
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent 75%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[520px] w-full">

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-syne font-black leading-none mb-6 select-none"
          style={{
            fontSize: 'clamp(100px, 20vw, 160px)',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(59,130,246,0.10))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.15))',
          }}>
          404
        </motion.div>

        {/* Logo + title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex items-center justify-center gap-3 mb-4">
          <PlanetLogo size={32} />
          <h1 className="font-syne text-[26px] sm:text-[30px] font-extrabold text-white tracking-tight">
            Page not found
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-[15px] leading-[1.75] mb-10"
          style={{ color: '#71717a' }}>
          The page you're looking for doesn't exist or has been moved.<br className="hidden sm:block" />
          Here are some places to get back on track.
        </motion.p>

        {/* Quick links grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="grid grid-cols-2 gap-2.5 max-w-[380px] mx-auto mb-8">
          {QUICK_LINKS.map(({ label, to, Icon: LinkIcon }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}>
              <Link
                to={to}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl font-syne text-[13px] font-semibold transition-all duration-200 group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.22)'
                  e.currentTarget.style.color = '#c4b5fd'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = '#a1a1aa'
                }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
                  <LinkIcon size={14} />
                </div>
                {label}
                <Icon.ArrowRight size={11} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Back home CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-11 px-7 rounded-xl font-syne text-[13.5px] font-bold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #3b82f6)', boxShadow: '0 4px 16px rgba(79,70,229,0.32)' }}>
            <Icon.Home size={13} />
            Back to Home
          </Link>
        </motion.div>

      </motion.div>
    </div>
  )
}