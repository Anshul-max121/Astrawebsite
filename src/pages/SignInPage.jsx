import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import PlanetLogo from '@/components/PlanetLogo'

/* ─── SVG Icons ────────────────────────────────────────────────────────────── */
const Icon = {
  Google: ({ size = 17 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  GitHub: ({ size = 17 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Spinner: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
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
  AlertCircle: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  Database: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  WifiOff: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>
  ),
  Zap: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Lock: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  Check: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Eye: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ),
}

/* ─── Left-panel feature list ──────────────────────────────────────────────── */
const FEATURES = [
  { Icon: Icon.Database, text: 'Visual database explorer with tree view'       },
  { Icon: Icon.WifiOff,  text: 'Offline-first cache — data stays visible'      },
  { Icon: Icon.Zap,      text: 'Install, start, and connect in minutes'        },
  { Icon: Icon.Lock,     text: 'Open-source, transparent, MIT licensed'        },
]

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════════════════ */
export default function SignInPage() {
  const [email,         setEmail]         = useState('')
  const [password,      setPassword]      = useState('')
  const [showPassword,  setShowPassword]  = useState(false)
  const [remember,      setRemember]      = useState(false)
  const [error,         setError]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { signIn, signInWithGoogle } = useAuth()
  const navigate      = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('error') === 'google_failed')
      setError('Google sign-in failed. Please try again.')
  }, [searchParams])

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    setGoogleLoading(true)
    signInWithGoogle()
  }

  /* animation helpers */
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
  const item      = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

      {/* ══ LEFT PANEL ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-col justify-center items-center px-14 xl:px-20 py-12 bg-slate-50 border-r border-slate-200 relative overflow-hidden">

        {/* Background atmosphere */}
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 25% 30%, rgba(59,130,246,0.10) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 75% 70%, rgba(99,102,241,0.08) 0%, transparent 55%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.045) 1px,transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 0%, transparent 75%)' }} />

        <motion.div
          initial="hidden" animate="show" variants={container}
          className="relative z-10 max-w-[400px] w-full">

          {/* Brand */}
          <motion.div variants={item} className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.08)] flex items-center justify-center">
              <PlanetLogo size={28} glow={false} />
            </div>
            <span className="font-syne text-[13px] font-extrabold tracking-[0.22em] text-slate-900">ASTRAFORGE</span>
          </motion.div>

          <motion.h2 variants={item}
            className="font-syne font-extrabold tracking-tight leading-[1.15] mb-4 text-slate-900"
            style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}>
            A clean database studio built for shipping teams.
          </motion.h2>

          <motion.p variants={item} className="text-[14.5px] text-slate-500 leading-[1.8] mb-10">
            Sign in to access your workspace, manage connections, and keep your settings synced across sessions.
          </motion.p>

          {/* Feature list */}
          <motion.div variants={item} className="flex flex-col gap-3">
            {FEATURES.map(({ Icon: FeatureIcon, text }) => (
              <div key={text} className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-slate-200 shadow-[0_4px_12px_rgba(15,23,42,0.05)] text-slate-600">
                  <FeatureIcon size={15} />
                </div>
                <span className="text-[13.5px] text-slate-700 font-medium">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Version badge */}
          <motion.div variants={item} className="mt-10 pt-8 border-t border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-[10.5px] text-emerald-700 tracking-wide">v1.0.0 · Open Source · MIT License</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ══ RIGHT FORM ══════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-center px-5 sm:px-8 py-14 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="w-full max-w-[420px]">

          {/* Mobile brand */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow flex items-center justify-center">
              <PlanetLogo size={24} glow={false} />
            </div>
            <span className="font-syne text-[12.5px] font-extrabold tracking-[0.22em] text-slate-900">ASTRAFORGE</span>
          </div>

          {/* Heading */}
          <h1 className="font-syne text-[28px] sm:text-[32px] font-extrabold text-slate-900 tracking-tight mb-1.5">
            Welcome back
          </h1>
          <p className="text-[14px] text-slate-500 mb-7">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Sign up free
            </Link>
          </p>

          {/* ── OAuth buttons ──────────────────────────────────────────────── */}
          <div className="flex flex-col gap-2.5 mb-6">

            {/* Google */}
            <button type="button" onClick={handleGoogle} disabled={googleLoading}
              className="flex items-center gap-3 px-5 py-3.5 w-full rounded-xl bg-white border border-slate-200 text-slate-800 font-syne text-[13.5px] font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-[0_2px_10px_rgba(15,23,42,0.06)] disabled:opacity-60 disabled:cursor-not-allowed">
              {googleLoading ? <Icon.Spinner size={16} /> : <Icon.Google size={17} />}
              <span>{googleLoading ? 'Redirecting to Google…' : 'Continue with Google'}</span>
            </button>

            {/* GitHub — coming soon */}
            <button type="button" disabled
              className="flex items-center gap-3 px-5 py-3.5 w-full rounded-xl bg-white border border-slate-200 text-slate-500 font-syne text-[13.5px] font-semibold cursor-not-allowed opacity-50 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
              title="Coming soon">
              <Icon.GitHub size={16} />
              <span>Continue with GitHub</span>
              <span className="ml-auto font-mono text-[9.5px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Soon</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="font-mono text-[11.5px] text-slate-400 tracking-wide">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* ── Email + Password form ───────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="block font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500">
                  Password
                </label>
                <a href="#" className="text-[12px] text-slate-500 hover:text-blue-600 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-11 px-4 pr-11 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <Icon.EyeOff size={15} /> : <Icon.Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => setRemember(v => !v)}
                className={[
                  'w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-150',
                  remember ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-300',
                ].join(' ')}>
                {remember && <Icon.Check size={10} />}
              </div>
              <span className="text-[13.5px] text-slate-600 select-none">Remember me for 30 days</span>
            </label>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px]">
                <Icon.AlertCircle size={14} />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl font-syne text-[14px] font-extrabold bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(37,99,235,0.28)] flex items-center justify-center gap-2">
              {loading
                ? <><Icon.Spinner size={15} /> Signing in…</>
                : <>Sign In <Icon.ArrowRight size={13} /></>
              }
            </button>
          </form>

          {/* Legal */}
          <p className="text-center text-[11.5px] text-slate-400 mt-6 leading-[1.7]">
            By signing in you agree to our{' '}
            <a href="#" className="text-slate-500 hover:text-slate-700 font-semibold transition-colors">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-slate-500 hover:text-slate-700 font-semibold transition-colors">Privacy Policy</a>.
          </p>

          {/* Back link */}
          <div className="flex justify-center mt-5">
            <Link to="/" className="inline-flex items-center gap-1.5 text-[12.5px] text-slate-400 hover:text-blue-600 transition-colors font-medium">
              <Icon.ArrowLeft size={12} />
              Back to home
            </Link>
          </div>

        </motion.div>
      </div>

    </div>
  )
}