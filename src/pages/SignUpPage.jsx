import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  GitHub: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Spinner: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  ),
  Check: ({ size = 11 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  ArrowRight: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  ArrowLeft: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  AlertCircle: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
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
  Star: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Zap: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Cloud: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
    </svg>
  ),
  Users: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  Shield: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Package: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Headphones: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
    </svg>
  ),
}

/* ─── Password strength meter ──────────────────────────────────────────────── */
function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password) && /[0-9]/.test(password),
    password.length >= 12,
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = checks.filter(Boolean).length

  const ui =
    score <= 1 ? { bar: 'bg-red-500',     text: 'text-red-600',     label: 'Weak'   } :
    score <= 2 ? { bar: 'bg-amber-500',   text: 'text-amber-700',   label: 'Fair'   } :
    score <= 3 ? { bar: 'bg-emerald-500', text: 'text-emerald-700', label: 'Good'   } :
                 { bar: 'bg-emerald-600', text: 'text-emerald-700', label: 'Strong' }

  if (!password) return null

  return (
    <div className="mt-2.5">
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={['flex-1 h-1 rounded-full transition-all duration-300', i < score ? ui.bar : 'bg-slate-200'].join(' ')} />
        ))}
      </div>
      <div className={`font-mono text-[11px] ${ui.text}`}>{ui.label} password</div>
    </div>
  )
}

/* ─── Plan data ────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    active: true,
    badge: 'Current',
    badgeStyle: 'bg-blue-50 border-blue-200 text-blue-700',
    features: [
      { Icon: Icon.Package,    text: 'AstraForge desktop app' },
      { Icon: Icon.Zap,        text: 'Unlimited databases'    },
      { Icon: Icon.Shield,     text: 'Offline cache'          },
      { Icon: Icon.Headphones, text: 'Community support'      },
    ],
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    active: false,
    badge: 'Coming Soon',
    badgeStyle: 'bg-amber-50 border-amber-200 text-amber-700',
    features: [
      { Icon: Icon.Check,  text: 'Everything in Free'   },
      { Icon: Icon.Cloud,  text: 'AstraCloud hosting'   },
      { Icon: Icon.Users,  text: 'Team workspaces'      },
      { Icon: Icon.Star,   text: 'Priority support'     },
    ],
  },
]

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════════════════ */
export default function SignUpPage() {
  const [form,          setForm]          = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [agreed,        setAgreed]        = useState(false)
  const [showPassword,  setShowPassword]  = useState(false)
  const [error,         setError]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!agreed) { setError('Please agree to the Terms of Service to continue.'); return }
    setError('')
    setLoading(true)
    try {
      await signUp(form.firstName, form.lastName, form.email, form.password)
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

  const inputClass =
    'w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 ' +
    'text-[13.5px] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all'

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

      {/* ══ LEFT PANEL ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-col justify-center items-center px-14 xl:px-20 py-12 bg-slate-50 border-r border-slate-200 relative overflow-hidden">

        {/* Background atmosphere */}
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 25% 35%, rgba(59,130,246,0.10) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 75% 70%, rgba(99,102,241,0.08) 0%, transparent 55%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.045) 1px,transparent 1px)', backgroundSize: '52px 52px', maskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 0%, transparent 75%)' }} />

        <div className="relative z-10 max-w-[380px] w-full">

          {/* Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 shadow-[0_8px_24px_rgba(15,23,42,0.08)] flex items-center justify-center">
              <PlanetLogo size={28} glow={false} />
            </div>
            <span className="font-syne text-[13px] font-extrabold tracking-[0.22em] text-slate-900">ASTRAFORGE</span>
          </div>

          {/* Plan label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 font-mono text-[10.5px] tracking-[0.12em] uppercase text-blue-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Choose your plan
          </div>

          {/* Plan cards */}
          <div className="flex flex-col gap-3.5">
            {PLANS.map((plan, pi) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: pi * 0.08 }}
                className={[
                  'p-5 rounded-2xl border shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition-all duration-200',
                  plan.active
                    ? 'bg-white border-blue-200 shadow-[0_8px_24px_rgba(59,130,246,0.10)]'
                    : 'bg-white/60 border-slate-200 opacity-65',
                ].join(' ')}>

                <div className="flex items-center justify-between mb-2">
                  <span className="font-syne text-[15px] font-extrabold text-slate-900">{plan.name}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold border ${plan.badgeStyle}`}>
                    {plan.badge}
                  </span>
                </div>

                <div className="font-syne text-[22px] font-extrabold text-slate-900 mb-3.5 leading-none">
                  {plan.price}
                  <span className="font-mono text-[13px] font-normal text-slate-500 ml-0.5">{plan.period}</span>
                </div>

                <div className="flex flex-col gap-2">
                  {plan.features.map(({ Icon: FeatureIcon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-[12.5px] text-slate-700">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-emerald-600 bg-emerald-50 border border-emerald-100">
                        <FeatureIcon size={11} />
                      </div>
                      {text}
                    </div>
                  ))}
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ══ RIGHT FORM ══════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-center px-5 sm:px-8 py-14 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="w-full max-w-[440px]">

          {/* Mobile brand */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow flex items-center justify-center">
              <PlanetLogo size={24} glow={false} />
            </div>
            <span className="font-syne text-[12.5px] font-extrabold tracking-[0.22em] text-slate-900">ASTRAFORGE</span>
          </div>

          {/* Heading */}
          <h1 className="font-syne text-[28px] sm:text-[32px] font-extrabold text-slate-900 tracking-tight mb-1.5">
            Create your account
          </h1>
          <p className="text-[14px] text-slate-500 mb-7">
            Already have one?{' '}
            <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Sign in
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
              className="flex items-center gap-3 px-5 py-3.5 w-full rounded-xl bg-white border border-slate-200 text-slate-500 font-syne text-[13.5px] font-semibold cursor-not-allowed opacity-50 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
              <Icon.GitHub size={16} />
              <span>Continue with GitHub</span>
              <span className="ml-auto font-mono text-[9.5px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Soon</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="font-mono text-[11.5px] text-slate-400 tracking-wide">or with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* ── Form ───────────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2">
                  First name
                </label>
                <input type="text" value={form.firstName} onChange={set('firstName')}
                  placeholder="Anshul" required className={inputClass} />
              </div>
              <div>
                <label className="block font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2">
                  Last name
                </label>
                <input type="text" value={form.lastName} onChange={set('lastName')}
                  placeholder="Khichi" required className={inputClass} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2">
                Email address
              </label>
              <input type="email" value={form.email} onChange={set('email')}
                placeholder="you@example.com" required className={inputClass} />
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Min. 8 characters"
                  required
                  className={`${inputClass} pr-11`}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <Icon.EyeOff size={15} /> : <Icon.Eye size={15} />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
              {!form.password && (
                <p className="font-mono text-[11px] text-slate-400 mt-2">
                  Tip: use 12+ chars with a symbol for a strong password.
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer group mt-0.5">
              <div
                onClick={() => setAgreed(v => !v)}
                className={[
                  'w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-150',
                  agreed
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-slate-300 group-hover:border-blue-300',
                ].join(' ')}>
                {agreed && <Icon.Check size={10} />}
              </div>
              <span className="text-[13px] text-slate-600 leading-[1.6] select-none">
                I agree to the{' '}
                <a href="#" className="text-slate-700 hover:text-blue-600 font-semibold transition-colors">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-slate-700 hover:text-blue-600 font-semibold transition-colors">Privacy Policy</a>.
              </span>
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
            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-xl font-syne text-[14px] font-extrabold bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(37,99,235,0.28)] flex items-center justify-center gap-2 mt-0.5">
              {loading
                ? <><Icon.Spinner size={15} /> Creating account…</>
                : <>Create Account <Icon.ArrowRight size={13} /></>
              }
            </button>
          </form>

          {/* Back link */}
          <div className="flex justify-center mt-6">
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