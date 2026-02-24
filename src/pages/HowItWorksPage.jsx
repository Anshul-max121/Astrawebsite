import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import PageWrapper from '@/components/PageWrapper'
import PlanetLogo from '@/components/PlanetLogo'

/* ─── SVG Icons ────────────────────────────────────────────────────────────── */
const Icon = {
  Package: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Server: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  Download: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Link: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  ),
  Check: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Plus: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  Lightbulb: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18"/>
      <line x1="10" y1="22" x2="14" y2="22"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/>
    </svg>
  ),
  BookOpen: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
    </svg>
  ),
  Zap: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Windows: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5.557L10.373 4.5V11.5H3V5.557ZM11.373 4.356L21 2.918V11.5H11.373V4.356ZM3 12.5H10.373V19.5L3 18.443V12.5ZM11.373 12.5H21V21.082L11.373 19.644V12.5Z"/>
    </svg>
  ),
  Apple: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  Linux: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021C7.607.354 4.824 3.264 4.361 6.98c-.373 2.965.827 5.602 3.154 7.192.502.336.897.7 1.148 1.024.251.325.438.66.562.998.156.42.265.86.33 1.312.165 1.155.198 2.437.098 3.853-.053.757-.127 1.527-.24 2.313-.099.69.178 1.258.629 1.585.451.326 1.055.395 1.685.2C12.89 24.706 14.5 23.867 16.32 23.5c.78-.159 1.523-.174 2.067-.048.547.126.949.39 1.122.757.174.367.12.864-.253 1.487l-.038.064c-.353.598-.313 1.271.101 1.682.415.41 1.098.518 1.848.235.749-.282 1.522-.98 2.017-2.062.495-1.08.65-2.388.228-3.763C21.891 17.4 18.5 14.07 18.5 10.5c0-2.209-.507-4.148-1.408-5.75C16.194 3.148 14.447 0 12.504 0z"/>
    </svg>
  ),
  ArrowRight: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Star: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Clock: ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
}

/* ─── Helpers ──────────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

function SectionLabel({ children, accent = 'blue' }) {
  const colors = {
    blue:   'bg-blue-50 border-blue-200 text-blue-700',
    violet: 'bg-violet-50 border-violet-200 text-violet-700',
    slate:  'bg-slate-100 border-slate-200 text-slate-600',
  }
  const dotColors = { blue: 'bg-blue-500', violet: 'bg-violet-500', slate: 'bg-slate-400' }
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-mono text-[10.5px] tracking-[0.12em] uppercase mb-5 ${colors[accent]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[accent]}`} />
      {children}
    </div>
  )
}

/* ─── Terminal ─────────────────────────────────────────────────────────────── */
function Terminal({ lines, title = 'terminal' }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700 font-mono text-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"/>
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"/>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"/>
        <span className="ml-2 text-slate-500 text-[10px] tracking-wide uppercase">{title}</span>
      </div>
      <div className="bg-[#0d1117] p-5 space-y-1.5 min-h-[130px]">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-2.5">
            {l.prompt && <span className="text-slate-600 select-none flex-shrink-0">$</span>}
            {l.arrow  && <span className="text-slate-600 select-none flex-shrink-0">→</span>}
            <span style={{ color: l.color || '#94a3b8' }}>{l.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Steps Data ───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    n: '01',
    id: 'install',
    Icon: Icon.Package,
    title: 'Install AstraDB',
    subtitle: 'One command, any platform',
    accent: '#8b5cf6',
    desc: 'Install the AstraDB server globally via npm. It automatically downloads the right binary for your OS — Windows, macOS, or Linux. Node.js 18+ required.',
    demo: (
      <Terminal title="npm — install" lines={[
        { text: 'npm install -g astradb', prompt: true },
        { text: '' },
        { text: 'Fetching binary for linux-x64...', color: '#64748b' },
        { text: 'Binary downloaded successfully', color: '#34d399' },
        { text: '' },
        { text: 'added 1 package in 4.2s', color: '#34d399' },
        { text: '' },
        { text: 'astradb --version', prompt: true },
        { text: 'astradb v1.0.0', color: '#a78bfa' },
      ]} />
    ),
    tip: 'Requires Node.js 18 or higher. Run node --version to check your current version.',
  },
  {
    n: '02',
    id: 'start',
    Icon: Icon.Server,
    title: 'Start the server',
    subtitle: 'Running in seconds',
    accent: '#3b82f6',
    desc: 'One command starts the AstraDB server. It binds to localhost:8080 by default. Customise the port, data directory, and more via flags or a config file.',
    demo: (
      <Terminal title="astradb — server" lines={[
        { text: 'astradb start', prompt: true },
        { text: '' },
        { text: '╔══════════════════════════════════╗', color: '#1e3a5f' },
        { text: '║      AstraDB v1.0.0              ║', color: '#3b82f6' },
        { text: '╚══════════════════════════════════╝', color: '#1e3a5f' },
        { text: '' },
        { text: 'Server running at localhost:8080', arrow: true, color: '#34d399' },
        { text: 'Data directory  ~/.astradb/data',  arrow: true, color: '#94a3b8' },
        { text: 'REST API        localhost:8080/api', arrow: true, color: '#94a3b8' },
        { text: '' },
        { text: 'Waiting for connections...', color: '#475569' },
      ]} />
    ),
    tip: 'Use astradb start --port 9000 to change the default port.',
  },
  {
    n: '03',
    id: 'download',
    Icon: Icon.Download,
    title: 'Download AstraForge',
    subtitle: 'The GUI for AstraDB',
    accent: '#10b981',
    desc: "Download the AstraForge desktop app for your platform. No installer configuration needed — just open it and you're ready to connect.",
    demo: (
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.08)]">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="font-syne text-[13px] font-bold text-slate-700">Download AstraForge</div>
            <div className="font-mono text-[10.5px] text-slate-500 mt-0.5">v1.0.0 · Latest Release</div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
            <span className="font-mono text-[10px] text-emerald-700">Stable</span>
          </div>
        </div>
        <div className="p-4 space-y-2.5">
          {[
            { OsIcon: Icon.Windows, name: 'Windows', file: 'astraforge-win-x64.exe',           size: '9.2 MB', primary: true,  available: true  },
            { OsIcon: Icon.Apple,   name: 'macOS',   file: 'astraforge-mac-arm64.dmg',         size: '—',      primary: false, available: false },
            { OsIcon: Icon.Linux,   name: 'Linux',   file: 'astraforge-linux-x64.AppImage',    size: '—',      primary: false, available: false },
          ].map((p) => (
            <div key={p.name}
              className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${p.primary ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50/70 border-slate-200 opacity-60'}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border flex-shrink-0 ${p.primary ? 'bg-white border-emerald-200 text-slate-700' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                <p.OsIcon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-syne text-[13px] font-bold ${p.primary ? 'text-slate-900' : 'text-slate-500'}`}>{p.name}</div>
                <div className="font-mono text-[10px] text-slate-400 truncate">{p.available ? p.file : 'Coming soon'}</div>
              </div>
              <div className="flex-shrink-0">
                {p.available
                  ? <span className="inline-flex items-center gap-1 font-syne text-[11.5px] font-bold text-emerald-700"><Icon.Download size={11}/> Download</span>
                  : <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 font-mono text-[9.5px] font-semibold text-amber-600">Soon</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    tip: 'macOS users: drag to Applications after opening the .dmg file.',
  },
  {
    n: '04',
    id: 'connect',
    Icon: Icon.Link,
    title: 'Connect & Explore',
    subtitle: "You're in.",
    accent: '#f59e0b',
    desc: 'Open AstraForge, enter your host (localhost) and port (8080), and click Connect. Your databases and collections appear instantly in the tree sidebar.',
    demo: (
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.08)]">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400"/>
          <div className="font-syne text-[13px] font-bold text-slate-700">New Connection</div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-400 mb-1.5">Host</label>
            <div className="flex items-center h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[13px] text-slate-800">
              localhost
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-400 mb-1.5">Port</label>
            <div className="flex items-center h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[13px] text-slate-800">
              8080
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="flex-1 h-10 rounded-xl flex items-center justify-center font-syne text-[13px] font-extrabold text-white shadow-[0_4px_14px_rgba(245,158,11,0.3)]"
              style={{ background: '#f59e0b' }}>
              Connect
              <Icon.ArrowRight size={12} />
            </div>
            <div className="h-10 px-4 rounded-xl border border-slate-200 flex items-center font-syne text-[13px] font-semibold text-slate-600">
              Test
            </div>
          </div>
          <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"/>
            <span className="font-syne text-[12px] font-bold text-emerald-700">Connected to localhost:8080</span>
          </div>
        </div>
      </div>
    ),
    tip: 'Save connections to reconnect with one click next time.',
  },
]

/* ─── Comparison Data ──────────────────────────────────────────────────────── */
const COMPARE = [
  { feature: 'GUI to manage databases',   astra: true,  mongo: true,  sqlite: false },
  { feature: 'Offline cache',             astra: true,  mongo: false, sqlite: true  },
  { feature: 'npm one-line install',      astra: true,  mongo: false, sqlite: true  },
  { feature: 'REST API built-in',         astra: true,  mongo: false, sqlite: false },
  { feature: 'Schema validation',         astra: true,  mongo: true,  sqlite: false },
  { feature: 'Cross-platform binary',     astra: true,  mongo: true,  sqlite: true  },
  { feature: 'Open source (MIT)',         astra: true,  mongo: false, sqlite: true  },
]

/* ─── FAQ Accordion ────────────────────────────────────────────────────────── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-200 ${open ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 bg-white'}`}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="font-syne text-[14px] font-bold text-slate-900 pr-4">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200 ${open ? 'bg-blue-600 text-white rotate-45' : 'bg-slate-100 text-slate-500'}`}>
          <Icon.Plus size={11} />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}>
            <div className="px-5 pb-5 text-[13.5px] text-slate-600 leading-[1.75]">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════════════════ */
export default function HowItWorksPage() {
  return (
    <PageWrapper>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-14 bg-white overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(15,23,42,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.032) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, black, transparent)',
          }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(139,92,246,0.08), transparent)' }} />

        <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

            {/* Left */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 font-mono text-[10.5px] tracking-[0.12em] uppercase text-blue-700 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                How it works
              </div>

              <div className="flex items-center gap-4 mb-5">
                <PlanetLogo size={48} glow={false} />
                <h1 className="font-syne font-black tracking-[-0.02em] leading-[1.06] text-slate-900"
                  style={{ fontSize: 'clamp(30px, 5vw, 60px)' }}>
                  Up and running in{' '}
                  <span className="text-blue-600">under 2 minutes</span>
                </h1>
              </div>

              <p className="text-[16px] text-slate-500 leading-[1.8] max-w-[520px]">
                Four simple steps — install, start, download, connect. No config files, no boilerplate, no friction.
              </p>
            </div>

            {/* Right — timing pill */}
            <div className="flex-shrink-0">
              <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                {[
                  { label: 'npm install', time: '~30s', Icon: Icon.Package },
                  { label: 'astradb start', time: '~3s',  Icon: Icon.Server   },
                  { label: 'Download GUI',  time: '~60s', Icon: Icon.Download  },
                  { label: 'Connect',       time: '~5s',  Icon: Icon.Link      },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i > 0 && <div className="w-5 h-px bg-slate-300 hidden sm:block" />}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                        <t.Icon size={13} />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-slate-500 leading-none">{t.label}</div>
                        <div className="font-syne text-[13px] font-extrabold text-slate-900 mt-0.5">{t.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      <div className="w-full h-px bg-slate-100" />

      {/* ── Steps ──────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50/60 py-14">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-5">

          <FadeUp className="mb-8">
            <SectionLabel accent="violet">Installation guide</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
              <h2 className="font-syne font-extrabold tracking-tight text-slate-900 leading-[1.1]"
                style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
                Four steps to get started
              </h2>
              <p className="text-[13.5px] text-slate-500 max-w-sm lg:text-right leading-relaxed">
                Each step takes seconds. The whole process is under two minutes.
              </p>
            </div>
          </FadeUp>

          {STEPS.map((step, i) => (
            <FadeUp key={step.id} delay={i * 0.07}>
              <div
                id={step.id}
                className="rounded-2xl border bg-white overflow-hidden shadow-[0_2px_14px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_36px_rgba(15,23,42,0.09)] transition-all duration-300"
                style={{ borderColor: `${step.accent}22` }}>

                {/* Top accent line */}
                <div className="h-[3px] w-full" style={{ background: step.accent }} />

                <div className="grid grid-cols-1 lg:grid-cols-2">

                  {/* Left — text */}
                  <div className="p-7 sm:p-9 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-5">
                      {/* Step badge */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-syne text-[13px] font-extrabold text-white"
                        style={{ background: step.accent, boxShadow: `0 4px 14px ${step.accent}40` }}>
                        {step.n}
                      </div>
                      <div>
                        <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase mb-0.5"
                          style={{ color: step.accent }}>
                          {step.subtitle}
                        </div>
                        <div className="font-syne text-[20px] sm:text-[22px] font-extrabold text-slate-900 leading-tight flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center border"
                            style={{ background: `${step.accent}12`, borderColor: `${step.accent}22`, color: step.accent }}>
                            <step.Icon size={15} />
                          </div>
                          {step.title}
                        </div>
                      </div>
                    </div>

                    <p className="text-[14px] text-slate-500 leading-[1.8] mb-6">
                      {step.desc}
                    </p>

                    {/* Tip */}
                    <div className="flex items-start gap-2.5 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 mt-0.5">
                        <Icon.Lightbulb size={12} />
                      </div>
                      <span className="font-mono text-[11.5px] text-slate-600 leading-[1.6]">{step.tip}</span>
                    </div>
                  </div>

                  {/* Right — demo */}
                  <div className="p-6 sm:p-8 flex items-center"
                    style={{ background: `linear-gradient(135deg, ${step.accent}07 0%, transparent 55%)` }}>
                    <div className="w-full">
                      {step.demo}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-slate-100" />

      {/* ── Comparison Table ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          <FadeUp className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <SectionLabel accent="slate">Comparison</SectionLabel>
                <h2 className="font-syne font-extrabold tracking-tight text-slate-900 leading-[1.1]"
                  style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
                  How does AstraDB compare?
                </h2>
              </div>
              <p className="text-[13.5px] text-slate-500 max-w-sm lg:text-right leading-relaxed">
                Designed for developer-first workflows with zero infrastructure overhead.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
              {/* Header */}
              <div className="grid grid-cols-4 bg-slate-900">
                <div className="px-5 py-4 font-mono text-[10.5px] font-semibold text-slate-500 uppercase tracking-[0.12em]">Feature</div>
                {[
                  { name: 'AstraDB', star: true  },
                  { name: 'MongoDB', star: false },
                  { name: 'SQLite',  star: false },
                ].map((db, i) => (
                  <div key={db.name} className={`px-4 py-4 text-center font-syne text-[13px] font-extrabold ${i === 0 ? 'text-blue-400' : 'text-slate-400'}`}>
                    <div className="flex items-center justify-center gap-1.5">
                      {db.star && <Icon.Star size={11} />}
                      {db.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {COMPARE.map((row, i) => (
                <div key={i} className={`grid grid-cols-4 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}>
                  <div className="px-5 py-4 font-syne text-[13px] font-semibold text-slate-700">{row.feature}</div>
                  {[row.astra, row.mongo, row.sqlite].map((v, j) => (
                    <div key={j} className="px-4 py-4 flex items-center justify-center">
                      {v
                        ? <span className={`w-6 h-6 rounded-full flex items-center justify-center ${j === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            <Icon.Check size={11} />
                          </span>
                        : <span className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-400">
                            <Icon.X size={11} />
                          </span>
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="w-full h-px bg-slate-100" />

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50/60 py-16 lg:py-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          <FadeUp className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <SectionLabel accent="slate">FAQ</SectionLabel>
                <h2 className="font-syne font-extrabold tracking-tight text-slate-900 leading-[1.1]"
                  style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
                  Common questions
                </h2>
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            <div className="space-y-3">
              {[
                {
                  q: 'Do I need a MongoDB account?',
                  a: 'No. AstraDB is a standalone database — completely separate from MongoDB. No account, no cloud, no subscription needed.',
                },
                {
                  q: 'Does AstraForge work offline?',
                  a: 'Yes. AstraForge caches your data locally. Even if your AstraDB server is offline, you can still browse previously loaded documents.',
                },
                {
                  q: 'Is it really free?',
                  a: 'Completely free and open-source under the MIT license. AstraForge and the AstraDB npm package are both free forever.',
                },
              ].map((item, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <FAQItem q={item.q} a={item.a} />
                </FadeUp>
              ))}
            </div>
            <div className="space-y-3">
              {[
                {
                  q: 'What Node.js version do I need?',
                  a: 'Node.js 18 or higher is required for the npm install. The AstraForge desktop app has no Node.js requirement — just download and run.',
                },
                {
                  q: 'Can I use it in production?',
                  a: 'AstraDB v1.0.0 is suitable for local development and small projects. For large-scale production, watch for AstraCloud — coming soon.',
                },
                {
                  q: 'Which platforms are supported?',
                  a: 'Windows is fully supported today. macOS and Linux builds are actively in development and will be released soon via GitHub releases.',
                },
              ].map((item, i) => (
                <FadeUp key={i} delay={i * 0.05 + 0.1}>
                  <FAQItem q={item.q} a={item.a} />
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-slate-100" />

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-white py-20 lg:py-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(139,92,246,0.06), transparent 70%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.025) 1px,transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 70%)' }} />

        <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <FadeUp>
            <div className="rounded-2xl bg-slate-900 p-8 lg:p-12 overflow-hidden relative">
              <div aria-hidden className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25), transparent 65%)', filter: 'blur(40px)' }} />

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex items-start gap-5">
                  <PlanetLogo size={44} glow={false} />
                  <div>
                    <h2 className="text-xl lg:text-2xl xl:text-3xl font-syne font-bold text-white tracking-tight mb-2">
                      Ready to try it?
                    </h2>
                    <p className="text-[14px] text-slate-400 leading-relaxed max-w-lg">
                      Install AstraDB, download AstraForge, and you're exploring your data in under two minutes.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:flex-shrink-0">
                  <Link to="/download"
                    className="h-11 px-6 rounded-xl text-[13.5px] font-syne font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(59,130,246,0.4)]">
                    <Icon.Download size={14} />
                    Download AstraForge
                  </Link>
                  <Link to="/docs"
                    className="h-11 px-6 rounded-xl text-[13.5px] font-syne font-semibold text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <Icon.BookOpen size={13} />
                    Read the docs
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </PageWrapper>
  )
}