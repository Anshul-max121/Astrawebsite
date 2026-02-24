import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import PageWrapper from '@/components/PageWrapper'
import PlanetLogo from '@/components/PlanetLogo'
import { useAuth } from '@/context/AuthContext'

/* ─── SVG Icons ────────────────────────────────────────────────────────────── */
const Icon = {
  User: ({ size = 17 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Palette: ({ size = 17 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  Database: ({ size = 17 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  Bell: ({ size = 17 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  ),
  Shield: ({ size = 17 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Trash: ({ size = 17 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
    </svg>
  ),
  Check: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Camera: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>
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
  LogOut: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  AlertTriangle: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Sun: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  Moon: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  ),
  Monitor: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Key: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
    </svg>
  ),
  Globe: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  ),
  Spinner: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  ),
  ChevronRight: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
}

/* ─── Helpers ──────────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

/* ─── Toggle Switch ────────────────────────────────────────────────────────── */
function Toggle({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={[
        'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0',
        value ? 'bg-blue-600' : 'bg-slate-200',
      ].join(' ')}>
      <span className={[
        'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200',
        value ? 'translate-x-4' : 'translate-x-0.5',
      ].join(' ')} />
    </button>
  )
}

/* ─── Section wrapper ──────────────────────────────────────────────────────── */
function Section({ title, desc, children, id }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="mb-5">
        <h2 className="font-syne text-[16px] font-extrabold text-slate-900">{title}</h2>
        {desc && <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">{desc}</p>}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
        {children}
      </div>
    </div>
  )
}

/* ─── Row ──────────────────────────────────────────────────────────────────── */
function Row({ label, sub, children, border = true }) {
  return (
    <div className={['flex items-center justify-between gap-4 px-5 py-4', border ? 'border-b border-slate-100 last:border-0' : ''].join(' ')}>
      <div className="min-w-0">
        <div className="font-syne text-[13.5px] font-semibold text-slate-800">{label}</div>
        {sub && <div className="font-mono text-[11px] text-slate-500 mt-0.5">{sub}</div>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

/* ─── Input ────────────────────────────────────────────────────────────────── */
function Input({ value, onChange, placeholder, type = 'text', disabled }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="h-9 px-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-[13px] font-mono focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all disabled:bg-slate-50 disabled:text-slate-400 w-full sm:w-56"
    />
  )
}

/* ─── Toast ────────────────────────────────────────────────────────────────── */
function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-slate-900 text-white shadow-[0_8px_28px_rgba(15,23,42,0.22)] font-syne text-[13px] font-semibold">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Icon.Check size={10} />
          </div>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Nav items ────────────────────────────────────────────────────────────── */
const NAV = [
  { id: 'profile',       label: 'Profile',       Icon: Icon.User        },
  { id: 'appearance',    label: 'Appearance',     Icon: Icon.Palette     },
  { id: 'connections',   label: 'Connections',    Icon: Icon.Database    },
  { id: 'notifications', label: 'Notifications',  Icon: Icon.Bell        },
  { id: 'security',      label: 'Security',       Icon: Icon.Shield      },
  { id: 'danger',        label: 'Danger Zone',    Icon: Icon.Trash       },
]

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════════════════ */
export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  /* ── Profile state ── */
  const [profile, setProfile] = useState({
    firstName: user?.firstName || user?.displayName?.split(' ')[0] || '',
    lastName:  user?.lastName  || user?.displayName?.split(' ')[1] || '',
    email:     user?.email     || '',
    username:  user?.username  || '',
    bio:       '',
  })

  /* ── Appearance ── */
  const [theme, setTheme] = useState('system') // 'light' | 'dark' | 'system'
  const [accentColor, setAccentColor] = useState('blue')
  const [compactMode, setCompactMode] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  /* ── Connections ── */
  const [defaultPort, setDefaultPort] = useState('8080')
  const [defaultHost, setDefaultHost] = useState('localhost')
  const [autoConnect, setAutoConnect] = useState(true)
  const [rememberConnections, setRememberConnections] = useState(true)

  /* ── Notifications ── */
  const [notifs, setNotifs] = useState({
    serverDown:     true,
    newRelease:     true,
    emailDigest:    false,
    featureUpdates: true,
    tips:           false,
  })

  /* ── Security ── */
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw,     setShowNewPw]     = useState(false)
  const [currentPw,     setCurrentPw]     = useState('')
  const [newPw,         setNewPw]         = useState('')
  const [twoFA,         setTwoFA]         = useState(false)

  /* ── Danger ── */
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  /* ── UI state ── */
  const [activeNav,   setActiveNav]   = useState('profile')
  const [saving,      setSaving]      = useState(false)
  const [toast,       setToast]       = useState({ visible: false, message: '' })
  const [savingPw,    setSavingPw]    = useState(false)

  const showToast = (msg) => {
    setToast({ visible: true, message: msg })
    setTimeout(() => setToast({ visible: false, message: '' }), 3000)
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 900))
    setSaving(false)
    showToast('Profile saved successfully')
  }

  const handleSavePassword = async () => {
    if (!currentPw || !newPw) return
    setSavingPw(true)
    await new Promise(r => setTimeout(r, 900))
    setSavingPw(false)
    setCurrentPw('')
    setNewPw('')
    showToast('Password updated')
  }

  const handleSignOut = async () => {
    await signOut?.()
    navigate('/signin')
  }

  const scrollTo = (id) => {
    setActiveNav(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const ACCENT_COLORS = [
    { key: 'blue',    bg: 'bg-blue-500'   },
    { key: 'violet',  bg: 'bg-violet-500' },
    { key: 'emerald', bg: 'bg-emerald-500'},
    { key: 'orange',  bg: 'bg-orange-500' },
    { key: 'rose',    bg: 'bg-rose-500'   },
    { key: 'cyan',    bg: 'bg-cyan-500'   },
  ]

  return (
    <PageWrapper>
      <Toast message={toast.message} visible={toast.visible} />

      <div className="min-h-screen bg-slate-50/60">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="bg-white border-b border-slate-200">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
            <FadeUp>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-syne font-extrabold text-[20px] shadow-[0_4px_14px_rgba(59,130,246,0.3)]">
                      {(profile.firstName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors">
                      <Icon.Camera size={12} />
                    </button>
                  </div>
                  <div>
                    <h1 className="font-syne text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">
                      {profile.firstName ? `${profile.firstName} ${profile.lastName}`.trim() : 'Your Account'}
                    </h1>
                    <p className="font-mono text-[12px] text-slate-500 mt-0.5">{profile.email || 'No email set'}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-xl border border-slate-200 bg-white text-[13px] font-syne font-semibold text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all">
                  <Icon.LogOut size={14} />
                  Sign out
                </button>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Sidebar nav ────────────────────────────────────────────── */}
            <aside className="lg:w-[220px] xl:w-[240px] flex-shrink-0">
              <FadeUp>
                <nav className="sticky top-24 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.04)] p-1.5">
                  {NAV.map(({ id, label, Icon: NavIcon }) => (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className={[
                        'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-syne text-[13px] font-semibold transition-all duration-150',
                        id === 'danger'
                          ? activeNav === id
                            ? 'bg-red-50 text-red-600'
                            : 'text-red-500 hover:bg-red-50 hover:text-red-600'
                          : activeNav === id
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                      ].join(' ')}>
                      <NavIcon size={15} />
                      {label}
                    </button>
                  ))}
                </nav>
              </FadeUp>
            </aside>

            {/* ── Main content ───────────────────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-8">

              {/* ── PROFILE ──────────────────────────────────────────────── */}
              <FadeUp delay={0.05}>
                <Section id="profile" title="Profile" desc="Manage your public profile and personal information.">
                  <Row label="First name" sub="Shown on your public profile">
                    <Input value={profile.firstName} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))} placeholder="Anshul" />
                  </Row>
                  <Row label="Last name">
                    <Input value={profile.lastName} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))} placeholder="Khichi" />
                  </Row>
                  <Row label="Username" sub="Used for your public URL">
                    <Input value={profile.username} onChange={e => setProfile(p => ({ ...p, username: e.target.value }))} placeholder="anshulk" />
                  </Row>
                  <Row label="Email address" sub="Your sign-in email">
                    <Input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} type="email" placeholder="you@example.com" />
                  </Row>
                  <Row label="Bio" sub="Short description about yourself">
                    <Input value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} placeholder="Full-stack developer..." />
                  </Row>
                  <div className="px-5 py-4 bg-slate-50/70 flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-slate-400">Changes saved locally until you click Save.</span>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="inline-flex items-center gap-2 h-9 px-5 rounded-xl font-syne text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition-all shadow-[0_4px_12px_rgba(37,99,235,0.24)]">
                      {saving ? <><Icon.Spinner size={13} /> Saving…</> : 'Save changes'}
                    </button>
                  </div>
                </Section>
              </FadeUp>

              {/* ── APPEARANCE ───────────────────────────────────────────── */}
              <FadeUp delay={0.07}>
                <Section id="appearance" title="Appearance" desc="Customize how AstraForge looks on your device.">
                  {/* Theme */}
                  <div className="px-5 py-4 border-b border-slate-100">
                    <div className="font-syne text-[13.5px] font-semibold text-slate-800 mb-3">Theme</div>
                    <div className="flex gap-2.5">
                      {[
                        { key: 'light',  Icon: Icon.Sun,     label: 'Light'  },
                        { key: 'dark',   Icon: Icon.Moon,    label: 'Dark'   },
                        { key: 'system', Icon: Icon.Monitor, label: 'System' },
                      ].map(({ key, Icon: ThemeIcon, label }) => (
                        <button
                          key={key}
                          onClick={() => setTheme(key)}
                          className={[
                            'flex-1 flex flex-col items-center gap-2 py-3.5 rounded-xl border font-syne text-[12px] font-semibold transition-all',
                            theme === key
                              ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50',
                          ].join(' ')}>
                          <ThemeIcon size={16} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accent color */}
                  <div className="px-5 py-4 border-b border-slate-100">
                    <div className="font-syne text-[13.5px] font-semibold text-slate-800 mb-3">Accent color</div>
                    <div className="flex gap-2">
                      {ACCENT_COLORS.map(({ key, bg }) => (
                        <button
                          key={key}
                          onClick={() => setAccentColor(key)}
                          className={['w-8 h-8 rounded-xl flex items-center justify-center transition-all', bg, accentColor === key ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-105'].join(' ')}>
                          {accentColor === key && <Icon.Check size={11} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Row label="Compact mode" sub="Reduce spacing for denser layouts">
                    <Toggle value={compactMode} onChange={setCompactMode} />
                  </Row>
                  <Row label="Animations" sub="Enable UI transitions and motion">
                    <Toggle value={animationsEnabled} onChange={setAnimationsEnabled} />
                  </Row>
                </Section>
              </FadeUp>

              {/* ── CONNECTIONS ──────────────────────────────────────────── */}
              <FadeUp delay={0.09}>
                <Section id="connections" title="Connections" desc="Default settings for new AstraDB connections.">
                  <Row label="Default host" sub="Hostname for new connections">
                    <Input value={defaultHost} onChange={e => setDefaultHost(e.target.value)} placeholder="localhost" />
                  </Row>
                  <Row label="Default port" sub="Port for new connections">
                    <Input value={defaultPort} onChange={e => setDefaultPort(e.target.value)} placeholder="8080" />
                  </Row>
                  <Row label="Auto-connect on launch" sub="Connect to last used server on startup">
                    <Toggle value={autoConnect} onChange={setAutoConnect} />
                  </Row>
                  <Row label="Remember connections" sub="Save connection history locally">
                    <Toggle value={rememberConnections} onChange={setRememberConnections} />
                  </Row>
                  <div className="px-5 py-4 bg-slate-50/70 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Icon.Globe size={13} />
                    </div>
                    <p className="font-mono text-[11px] text-slate-500 leading-relaxed">
                      These defaults apply to new connections. Existing saved connections are unaffected.
                    </p>
                  </div>
                </Section>
              </FadeUp>

              {/* ── NOTIFICATIONS ────────────────────────────────────────── */}
              <FadeUp delay={0.11}>
                <Section id="notifications" title="Notifications" desc="Choose when and how you receive notifications.">
                  <Row label="Server disconnect alerts" sub="Notify when AstraDB server goes offline">
                    <Toggle value={notifs.serverDown} onChange={v => setNotifs(n => ({ ...n, serverDown: v }))} />
                  </Row>
                  <Row label="New release notifications" sub="Get notified about AstraForge updates">
                    <Toggle value={notifs.newRelease} onChange={v => setNotifs(n => ({ ...n, newRelease: v }))} />
                  </Row>
                  <Row label="Feature announcements" sub="Hear about new features on the roadmap">
                    <Toggle value={notifs.featureUpdates} onChange={v => setNotifs(n => ({ ...n, featureUpdates: v }))} />
                  </Row>
                  <Row label="Weekly digest email" sub="Summary of activity sent to your email">
                    <Toggle value={notifs.emailDigest} onChange={v => setNotifs(n => ({ ...n, emailDigest: v }))} />
                  </Row>
                  <Row label="Tips & tutorials" sub="Helpful tips to get the most from AstraForge">
                    <Toggle value={notifs.tips} onChange={v => setNotifs(n => ({ ...n, tips: v }))} />
                  </Row>
                </Section>
              </FadeUp>

              {/* ── SECURITY ─────────────────────────────────────────────── */}
              <FadeUp delay={0.13}>
                <Section id="security" title="Security" desc="Manage your password and account security.">

                  {/* Change password */}
                  <div className="px-5 py-4 border-b border-slate-100">
                    <div className="font-syne text-[13.5px] font-semibold text-slate-800 mb-4">Change password</div>
                    <div className="space-y-3 max-w-sm">
                      <div>
                        <label className="block font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-1.5">Current password</label>
                        <div className="relative">
                          <input
                            type={showCurrentPw ? 'text' : 'password'}
                            value={currentPw}
                            onChange={e => setCurrentPw(e.target.value)}
                            placeholder="••••••••"
                            className="w-full h-10 px-3.5 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                          />
                          <button type="button" onClick={() => setShowCurrentPw(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                            {showCurrentPw ? <Icon.EyeOff size={14} /> : <Icon.Eye size={14} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-1.5">New password</label>
                        <div className="relative">
                          <input
                            type={showNewPw ? 'text' : 'password'}
                            value={newPw}
                            onChange={e => setNewPw(e.target.value)}
                            placeholder="Min. 8 characters"
                            className="w-full h-10 px-3.5 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                          />
                          <button type="button" onClick={() => setShowNewPw(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                            {showNewPw ? <Icon.EyeOff size={14} /> : <Icon.Eye size={14} />}
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handleSavePassword}
                        disabled={savingPw || !currentPw || !newPw}
                        className="inline-flex items-center gap-2 h-9 px-5 rounded-xl font-syne text-[13px] font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-all">
                        {savingPw ? <><Icon.Spinner size={13} /> Updating…</> : <>Update password</>}
                      </button>
                    </div>
                  </div>

                  {/* 2FA */}
                  <Row label="Two-factor authentication" sub="Add an extra layer of security to your account">
                    <div className="flex items-center gap-3">
                      {!twoFA && (
                        <span className="font-mono text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Recommended</span>
                      )}
                      <Toggle value={twoFA} onChange={setTwoFA} />
                    </div>
                  </Row>

                  {/* Active sessions */}
                  <div className="px-5 py-4">
                    <div className="font-syne text-[13.5px] font-semibold text-slate-800 mb-3">Active sessions</div>
                    <div className="space-y-2">
                      {[
                        { device: 'This device', location: 'Current session', time: 'Active now', current: true },
                        { device: 'Chrome on Windows', location: 'India', time: '2 days ago', current: false },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.current ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                            <div>
                              <div className="font-syne text-[12.5px] font-semibold text-slate-800">{s.device}</div>
                              <div className="font-mono text-[10.5px] text-slate-500">{s.location} · {s.time}</div>
                            </div>
                          </div>
                          {!s.current && (
                            <button className="font-mono text-[11px] text-red-500 hover:text-red-700 transition-colors font-semibold">
                              Revoke
                            </button>
                          )}
                          {s.current && (
                            <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Current</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Section>
              </FadeUp>

              {/* ── DANGER ZONE ──────────────────────────────────────────── */}
              <FadeUp delay={0.15}>
                <Section id="danger" title="Danger Zone" desc="Irreversible and destructive actions.">
                  <div className="p-5">
                    <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
                      <div className="flex items-start gap-3.5 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center flex-shrink-0 text-red-600">
                          <Icon.AlertTriangle size={15} />
                        </div>
                        <div>
                          <div className="font-syne text-[14px] font-extrabold text-red-700">Delete account</div>
                          <p className="font-mono text-[11.5px] text-red-600/80 mt-0.5 leading-relaxed">
                            This will permanently delete your account, all saved connections, and workspace data. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block font-mono text-[10px] font-semibold tracking-[0.1em] uppercase text-red-600 mb-1.5">
                            Type <span className="font-extrabold">DELETE</span> to confirm
                          </label>
                          <input
                            type="text"
                            value={deleteConfirm}
                            onChange={e => setDeleteConfirm(e.target.value)}
                            placeholder="DELETE"
                            className="h-10 px-3.5 rounded-xl border border-red-200 bg-white text-slate-900 text-[13px] font-mono focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all w-full sm:w-48"
                          />
                        </div>
                        <button
                          disabled={deleteConfirm !== 'DELETE'}
                          onClick={() => setShowDeleteModal(true)}
                          className="inline-flex items-center gap-2 h-9 px-5 rounded-xl font-syne text-[13px] font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                          <Icon.Trash size={13} />
                          Delete my account
                        </button>
                      </div>
                    </div>
                  </div>
                </Section>
              </FadeUp>

              {/* Bottom spacer */}
              <div className="h-6" />

            </div>
          </div>
        </div>
      </div>

      {/* ── Delete confirmation modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-[400px] rounded-2xl bg-white border border-slate-200 shadow-[0_24px_60px_rgba(15,23,42,0.22)] p-6">
              <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 mb-4">
                <Icon.AlertTriangle size={20} />
              </div>
              <h3 className="font-syne text-[18px] font-extrabold text-slate-900 mb-2">Delete account?</h3>
              <p className="text-[13.5px] text-slate-600 leading-relaxed mb-6">
                This is permanent. All your data, connections, and settings will be destroyed and cannot be recovered.
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 h-10 rounded-xl border border-slate-200 font-syne text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                  Cancel
                </button>
                <button
                  className="flex-1 h-10 rounded-xl bg-red-600 font-syne text-[13px] font-bold text-white hover:bg-red-700 transition-all">
                  Yes, delete it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </PageWrapper>
  )
}