import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useInView as useInViewObs } from 'react-intersection-observer'
import PageWrapper from '@/components/PageWrapper'
import PlanetLogo from '@/components/PlanetLogo'

/* ─── SVG Icon System ────────────────────────────────────────────────────────── */
const Icon = {
  Database: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Table: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  ),
  Edit: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  WifiOff: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  Search: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Package: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Terminal: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  Globe: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  Shield: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Code: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Zap: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Download: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  BookOpen: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowRight: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Circle: ({ size = 8 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
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

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 font-mono text-[10.5px] tracking-[0.12em] uppercase text-blue-700 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      {children}
    </div>
  )
}

/* ─── Terminal Component ─────────────────────────────────────────────────────── */
function Terminal({ lines }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700 font-mono text-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-slate-500 text-[10px] tracking-wide uppercase">astradb — terminal</span>
      </div>
      <div className="bg-[#0d1117] p-5 space-y-2 min-h-[120px]">
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

/* ─── Bento Card ─────────────────────────────────────────────────────────────── */
function BentoCard({ children, className = '', accent, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={[
        'relative rounded-2xl overflow-hidden border bg-white',
        'hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)] hover:-translate-y-0.5',
        'transition-all duration-300',
        className,
      ].join(' ')}
      style={{ borderColor: accent ? `${accent}28` : '#e2e8f0' }}>
      {accent && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 55% at 0% 0%, ${accent}0e 0%, transparent 55%)` }} />
      )}
      {children}
    </motion.div>
  )
}

/* ─── Feature Icon Badge ─────────────────────────────────────────────────────── */
function IconBadge({ icon: IconComp, accent }) {
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0"
      style={{ background: `${accent}12`, borderColor: `${accent}22`, color: accent }}>
      <IconComp size={18} />
    </div>
  )
}

/* ─── Stats ──────────────────────────────────────────────────────────────────── */
const STATS = [
  { value: '< 2min', label: 'Setup time',   sub: 'From install to running' },
  { value: '3',      label: 'Platforms',    sub: 'Win · Mac · Linux'       },
  { value: '100%',   label: 'Open source',  sub: 'MIT Licensed'            },
  { value: '0',      label: 'Config files', sub: 'Works out of the box'    },
]

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════════════════ */
export default function FeaturesPage() {
  return (
    <PageWrapper>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-white overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(15,23,42,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.032) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, black, transparent)',
          }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(59,130,246,0.08), transparent)' }} />

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
                Features
              </div>

              <div className="flex items-center gap-4 mb-5">
                <PlanetLogo size={48} glow={false} />
                <h1 className="font-syne font-black tracking-[-0.02em] leading-[1.06] text-slate-900"
                  style={{ fontSize: 'clamp(32px, 5vw, 62px)' }}>
                  Everything to manage{' '}
                  <span className="text-blue-600">AstraDB</span>
                </h1>
              </div>

              <p className="text-[16px] text-slate-500 leading-[1.8] max-w-[520px]">
                AstraForge gives you a beautiful GUI — visual explorer, full CRUD, live search, and offline cache.
                No CLI needed, no config, no friction.
              </p>
            </div>

            {/* Right — quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end">
              <Link to="/download"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-syne text-[13.5px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_4px_16px_rgba(37,99,235,0.28)]">
                <Icon.Download size={14} /> Download Free
              </Link>
              <Link to="/docs"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-syne text-[13.5px] font-semibold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all">
                <Icon.BookOpen size={14} /> Read the docs
              </Link>
            </div>
          </motion.div>

          {/* Stats bar */}
          <FadeUp delay={0.2} className="mt-14">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white px-6 py-5 text-center">
                  <div className="font-syne text-[26px] font-extrabold text-slate-900 leading-none mb-1">{s.value}</div>
                  <div className="font-mono text-[10.5px] text-slate-500 tracking-wide uppercase">{s.label}</div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="w-full h-px bg-slate-100" />

      {/* ── Bento Grid ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50/60 py-14">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          <FadeUp className="mb-8">
            <SectionLabel>Core capabilities</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="font-syne font-extrabold tracking-tight text-slate-900 leading-[1.1]"
                style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
                Built for developers who ship
              </h2>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {['No config required', 'Offline-ready', 'Cross-platform', 'MIT License', 'Live search', 'JSON + Table views'].map(feat => (
                  <span key={feat} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[12px] font-medium text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />{feat}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* ── Row 1: Visual Explorer (wide) + CRUD ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* 1. Visual Explorer — 2 cols */}
            <BentoCard accent="#3b82f6" delay={0} className="lg:col-span-2 p-7 sm:p-8">
              <div className="flex items-center gap-3.5 mb-5">
                <IconBadge icon={Icon.Database} accent="#3b82f6" />
                <div>
                  <div className="font-syne text-[17px] font-extrabold text-slate-900">Visual Database Explorer</div>
                  <div className="font-mono text-[11px] text-blue-600 mt-0.5">Navigate every collection at a glance</div>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-6 max-w-[440px]">
                Collapsible tree sidebar shows every database and collection. Create, rename, and delete inline — no CLI needed.
              </p>
              <Terminal lines={[
                { text: 'astradb start', prompt: true },
                { text: 'Server ready at localhost:8080', arrow: true, color: '#34d399' },
                { text: '' },
                { text: 'hospitaldb', color: '#93c5fd' },
                { text: '   ├── patients    (1,204 docs)', color: '#475569' },
                { text: '   ├── doctors     (88 docs)',    color: '#475569' },
                { text: '   └── records     (9,402 docs)', color: '#475569' },
                { text: 'blogdb', color: '#93c5fd' },
                { text: '   └── posts       (342 docs)',   color: '#475569' },
              ]} />
            </BentoCard>

            {/* 2. Full CRUD */}
            <BentoCard accent="#10b981" delay={0.08} className="p-7 flex flex-col">
              <div className="flex items-center gap-3.5 mb-4">
                <IconBadge icon={Icon.Edit} accent="#10b981" />
                <div>
                  <div className="font-syne text-[17px] font-extrabold text-slate-900">Full CRUD</div>
                  <div className="font-mono text-[11px] text-emerald-600 mt-0.5">Insert · Edit · Delete</div>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-5">
                Beautiful modals with live JSON validation and auto-generated sample data. Instant feedback on every operation.
              </p>

              {/* CRUD mock */}
              <div className="flex-1 rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-syne text-[11.5px] font-bold text-slate-700">Edit Document</span>
                  <span className="font-mono text-[9.5px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Valid JSON</span>
                </div>
                <div className="p-4 font-mono text-[11px] bg-[#0d1117] min-h-[140px]">
                  <span className="text-slate-500">{'{'}</span><br />
                  <span className="ml-4 text-sky-400">"name"</span><span className="text-slate-400">: </span><span className="text-amber-300">"Rahul M."</span><span className="text-slate-500">,</span><br />
                  <span className="ml-4 text-sky-400">"age"</span><span className="text-slate-400">: </span><span className="text-purple-400">28</span><span className="text-slate-500">,</span><br />
                  <span className="ml-4 text-sky-400">"status"</span><span className="text-slate-400">: </span><span className="text-amber-300">"active"</span><br />
                  <span className="text-slate-500">{'}'}</span>
                </div>
                <div className="px-4 py-2.5 flex gap-2 border-t border-slate-100 bg-white">
                  <button className="flex-1 h-8 rounded-lg bg-emerald-600 text-white font-syne text-[12px] font-bold">Save</button>
                  <button className="h-8 px-3 rounded-lg border border-slate-200 text-slate-600 font-syne text-[12px] font-bold">Cancel</button>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* ── Row 2: Table View + Offline Cache + Live Search ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

            {/* 3. Table & JSON Views */}
            <BentoCard accent="#06b6d4" delay={0.04} className="p-7">
              <div className="flex items-center gap-3.5 mb-4">
                <IconBadge icon={Icon.Table} accent="#06b6d4" />
                <div>
                  <div className="font-syne text-[17px] font-extrabold text-slate-900">Table & JSON Views</div>
                  <div className="font-mono text-[11px] text-cyan-600 mt-0.5">Your data, your way</div>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-5">
                Spreadsheet-style table with color-coded types or raw JSON — toggle any time with one click.
              </p>

              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
                  <span className="font-mono text-[10px] text-slate-500">patients</span>
                  <div className="flex gap-1">
                    {['Table', 'JSON'].map((v, i) => (
                      <span key={v} className={`px-2 py-0.5 rounded-md text-[10px] font-syne font-bold ${i === 0 ? 'bg-white border border-slate-200 text-slate-800 shadow-sm' : 'text-slate-400'}`}>{v}</span>
                    ))}
                  </div>
                </div>
                <table className="w-full font-mono text-[11px]">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>{['name', 'age', 'status'].map(h => (
                      <th key={h} className="px-3 py-1.5 text-left text-[9.5px] font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Rahul M.', age: 28, status: 'active' },
                      { name: 'Priya S.', age: 34, status: 'inactive' },
                      { name: 'Karan T.', age: 22, status: 'active' },
                    ].map((r, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-3 py-2 text-slate-700">{r.name}</td>
                        <td className="px-3 py-2 text-amber-600">{r.age}</td>
                        <td className="px-3 py-2">
                          <span className={`px-1.5 py-0.5 rounded-full text-[9.5px] font-bold ${r.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </BentoCard>

            {/* 4. Offline Cache */}
            <BentoCard accent="#f59e0b" delay={0.08} className="p-7">
              <div className="flex items-center gap-3.5 mb-4">
                <IconBadge icon={Icon.WifiOff} accent="#f59e0b" />
                <div>
                  <div className="font-syne text-[17px] font-extrabold text-slate-900">Offline Cache</div>
                  <div className="font-mono text-[11px] text-amber-600 mt-0.5">Always available</div>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-6">
                Data stays visible when your server is offline. Cached automatically across restarts — no extra config.
              </p>

              <div className="space-y-2.5">
                {[
                  { label: 'hospitaldb / patients', status: 'cached',  count: '1,204 docs' },
                  { label: 'blogdb / posts',         status: 'cached',  count: '342 docs' },
                  { label: 'iotdb / sensors',        status: 'syncing', count: '88,201 docs' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.status === 'cached' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[11px] text-slate-700 truncate">{item.label}</div>
                      <div className="font-mono text-[10px] text-slate-400">{item.count}</div>
                    </div>
                    <span className={`font-mono text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${item.status === 'cached' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* 5. Live Search */}
            <BentoCard accent="#ef4444" delay={0.12} className="p-7">
              <div className="flex items-center gap-3.5 mb-4">
                <IconBadge icon={Icon.Search} accent="#ef4444" />
                <div>
                  <div className="font-syne text-[17px] font-extrabold text-slate-900">Live Search</div>
                  <div className="font-mono text-[11px] text-red-500 mt-0.5">Zero latency</div>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-5">
                Filter documents across all fields in real-time. No page reload, no debounce delay — results appear as you type.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-blue-200 bg-blue-50/70">
                  <Icon.Search size={13} />
                  <span className="font-mono text-[12px] text-slate-700">rahul</span>
                  <span className="ml-auto font-mono text-[10px] text-slate-400">3 results</span>
                </div>
                {[
                  { name: 'Rahul M.',      field: 'name',  db: 'patients' },
                  { name: 'rahul@dev.io',  field: 'email', db: 'users'    },
                  { name: 'Dr. Rahul S.', field: 'name',  db: 'doctors'  },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white border border-slate-100 hover:border-blue-200 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[11.5px] text-slate-800 truncate">{r.name}</div>
                      <div className="font-mono text-[10px] text-slate-400">{r.db} · {r.field}</div>
                    </div>
                    <Icon.ArrowRight size={10} />
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>

          {/* ── Row 3: npm Install (wide) + REST API ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">

            {/* 6. One-line Install */}
            <BentoCard accent="#8b5cf6" delay={0.04} className="lg:col-span-3 p-7 sm:p-8">
              <div className="flex items-center gap-3.5 mb-5">
                <IconBadge icon={Icon.Package} accent="#8b5cf6" />
                <div>
                  <div className="font-syne text-[18px] font-extrabold text-slate-900">One-line Install</div>
                  <div className="font-mono text-[11.5px] text-violet-600 mt-0.5">Right binary, every platform</div>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-6 max-w-[400px]">
                One command installs AstraDB with the correct binary for your OS — Windows, macOS, or Linux. It just works.
              </p>
              <Terminal lines={[
                { text: 'npm install -g astradb', prompt: true },
                { text: '' },
                { text: 'Downloading binary for linux-x64...', color: '#94a3b8' },
                { text: 'astradb@1.0.0 installed successfully', color: '#34d399' },
                { text: '' },
                { text: 'astradb start', prompt: true },
                { text: 'Server running at http://localhost:8080', arrow: true, color: '#a78bfa' },
              ]} />
            </BentoCard>

            {/* 7. REST API */}
            <BentoCard accent="#f97316" delay={0.08} className="lg:col-span-2 p-7 flex flex-col">
              <div className="flex items-center gap-3.5 mb-4">
                <IconBadge icon={Icon.Globe} accent="#f97316" />
                <div>
                  <div className="font-syne text-[17px] font-extrabold text-slate-900">REST API</div>
                  <div className="font-mono text-[11px] text-orange-500 mt-0.5">HTTP endpoints built-in</div>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-5">
                Every AstraDB instance exposes a REST API automatically. Query from any language or tool.
              </p>
              <div className="flex-1 space-y-2 font-mono text-[11px]">
                {[
                  { method: 'GET',    color: 'bg-emerald-50 text-emerald-700 border-emerald-200', path: '/db/patients/find'   },
                  { method: 'POST',   color: 'bg-blue-50 text-blue-700 border-blue-200',          path: '/db/patients/insert' },
                  { method: 'PUT',    color: 'bg-amber-50 text-amber-700 border-amber-200',        path: '/db/patients/:id'    },
                  { method: 'DELETE', color: 'bg-red-50 text-red-700 border-red-200',              path: '/db/patients/:id'    },
                ].map((r) => (
                  <div key={r.method} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className={`px-2 py-0.5 rounded-lg text-[9.5px] font-bold border flex-shrink-0 w-[54px] text-center ${r.color}`}>{r.method}</span>
                    <span className="text-slate-600 truncate">{r.path}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>

          {/* ── Row 4: Schema Validation + TypeScript ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            {/* 8. Schema Validation */}
            <BentoCard accent="#14b8a6" delay={0.04} className="p-7">
              <div className="flex items-center gap-3.5 mb-4">
                <IconBadge icon={Icon.Shield} accent="#14b8a6" />
                <div>
                  <div className="font-syne text-[17px] font-extrabold text-slate-900">Schema Validation</div>
                  <div className="font-mono text-[11px] text-teal-600 mt-0.5">Keep your data clean</div>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-5">
                Define schemas to enforce data types and required fields. AstraDB validates every insert and update automatically.
              </p>
              <div className="rounded-xl border border-slate-700 overflow-hidden font-mono text-[11.5px] bg-[#0d1117] p-5">
                <span className="text-slate-500">db.createCollection(</span><span className="text-amber-300">'users'</span><span className="text-slate-500">, {'{'}</span><br />
                <span className="ml-4 text-sky-400">schema</span><span className="text-slate-400">: {'{'}</span><br />
                <span className="ml-8 text-slate-300">name</span><span className="text-slate-400">:  </span><span className="text-purple-400">String</span><span className="text-slate-500">,</span><br />
                <span className="ml-8 text-slate-300">age</span><span className="text-slate-400">:   </span><span className="text-purple-400">Number</span><span className="text-slate-500">,</span><br />
                <span className="ml-8 text-slate-300">email</span><span className="text-slate-400">: </span><span className="text-purple-400">String</span><br />
                <span className="ml-4 text-slate-400">{'}'}</span><br />
                <span className="text-slate-500">{'}'})</span>
              </div>
            </BentoCard>

            {/* 9. TypeScript */}
            <BentoCard accent="#2563eb" delay={0.08} className="p-7">
              <div className="flex items-center gap-3.5 mb-4">
                <IconBadge icon={Icon.Code} accent="#2563eb" />
                <div>
                  <div className="font-syne text-[17px] font-extrabold text-slate-900">TypeScript Support</div>
                  <div className="font-mono text-[11px] text-blue-600 mt-0.5">Full type safety</div>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-5">
                First-class TypeScript support with full type inference. Autocomplete for every query, collection, and result.
              </p>
              <div className="rounded-xl border border-slate-700 overflow-hidden font-mono text-[11.5px] bg-[#0d1117] p-5">
                <span className="text-slate-500">import</span><span className="text-slate-300"> AstraDB </span><span className="text-slate-500">from </span><span className="text-amber-300">'astradb'</span><br />
                <br />
                <span className="text-sky-400">interface</span><span className="text-emerald-300"> User </span><span className="text-slate-400">{'{'}</span><br />
                <span className="ml-4 text-slate-300">name</span><span className="text-slate-500">: </span><span className="text-purple-400">string</span><br />
                <span className="ml-4 text-slate-300">age</span><span className="text-slate-500">:  </span><span className="text-purple-400">number</span><br />
                <span className="text-slate-400">{'}'}</span><br />
                <br />
                <span className="text-slate-500">const</span><span className="text-slate-300"> users </span><span className="text-slate-500">= db.collection</span>
                <span className="text-amber-300">{'<User>'}</span><span className="text-slate-500">{'('}</span><span className="text-amber-300">'users'</span><span className="text-slate-500">{')'}</span>
              </div>
            </BentoCard>
          </div>

        </div>
      </section>

      <div className="w-full h-px bg-slate-100" />

      {/* ── How It Works inline ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          <FadeUp className="mb-10">
            <SectionLabel>How it works</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="font-syne font-extrabold tracking-tight text-slate-900 leading-[1.1]"
                style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
                Up and running in three steps
              </h2>
              <p className="text-[14px] text-slate-500 max-w-sm lg:text-right leading-relaxed">
                The entire process takes under two minutes.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {[
              { n: '01', Icon: Icon.Package,  title: 'Install AstraDB',   desc: 'Install the database engine globally using npm.', cmd: 'npm install -g astradb', accent: '#3b82f6' },
              { n: '02', Icon: Icon.Terminal, title: 'Start the server',  desc: 'Launch AstraDB locally on localhost:8080.',        cmd: 'astradb start',          accent: '#8b5cf6' },
              { n: '03', Icon: Icon.Globe,    title: 'Connect & explore', desc: 'Open AstraForge, enter your host and port, click Connect.', cmd: null,             accent: '#10b981' },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.08}>
                <div className="relative h-full p-6 lg:p-7 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)] hover:-translate-y-0.5 transition-all duration-300">
                  {/* Connector arrow for desktop */}
                  {i < 2 && (
                    <div className="hidden sm:flex absolute -right-[9px] top-10 z-10 w-[18px] h-[18px] rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center text-slate-400">
                      <Icon.ArrowRight size={10} />
                    </div>
                  )}
                  <div className="font-mono text-[10px] font-semibold text-slate-400 mb-4 tracking-[0.14em] uppercase">Step {step.n}</div>
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center mb-5"
                    style={{ background: `${step.accent}10`, borderColor: `${step.accent}20`, color: step.accent }}>
                    <step.Icon size={18} />
                  </div>
                  <h3 className="font-syne text-[15.5px] font-extrabold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-[1.75] mb-5">{step.desc}</p>
                  {step.cmd && (
                    <div className="inline-block px-4 py-2 rounded-lg bg-slate-900 font-mono text-[11.5px] text-emerald-400">{step.cmd}</div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-slate-100" />

      {/* ── Open Source Banner ──────────────────────────────────────────────── */}
      <section className="bg-slate-50/70 py-12">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <FadeUp>
            <div className="rounded-2xl bg-slate-900 p-7 sm:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7 overflow-hidden relative">
              <div aria-hidden className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent 65%)', filter: 'blur(32px)' }} />
              <div className="flex items-start gap-5 relative">
                <div className="w-11 h-11 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <PlanetLogo size={32} glow={false} />
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-[18px] sm:text-[21px] text-white tracking-tight mb-1.5">Fully open source</h3>
                  <p className="text-[13.5px] text-slate-400 leading-relaxed max-w-[440px]">
                    AstraForge and AstraDB are both MIT licensed. Read the code, contribute, or fork it. Built in public, for the community.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0 relative">
                <a href="https://github.com/AnshulKhichi11/AstraDB" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-syne text-[13px] font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                  View on GitHub
                </a>
                <a href="https://www.npmjs.com/package/astradb" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-syne text-[13px] font-bold text-white border border-white/15 hover:bg-white/8 transition-all">
                  npm package
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="w-full h-px bg-slate-100" />

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-white py-20 lg:py-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(59,130,246,0.06), transparent 70%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.025) 1px,transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 70%)' }} />

        <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <FadeUp>
            <div className="text-center max-w-[580px] mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 font-mono text-[10.5px] text-blue-700 tracking-[0.1em] uppercase mb-7">
                <Icon.Zap size={11} /> Start for free
              </div>
              <h2 className="font-syne font-black tracking-tight leading-[1.08] mb-5 text-slate-900"
                style={{ fontSize: 'clamp(26px, 5vw, 50px)' }}>
                Ready to ship faster?
              </h2>
              <p className="text-[15px] sm:text-[16px] text-slate-500 mb-10 leading-[1.8]">
                Download AstraForge free. Works on Windows, macOS, and Linux. No setup, no account, no friction.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/download"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-syne text-[14px] font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(37,99,235,0.28)]">
                  <Icon.Download size={14} /> Download Free
                </Link>
                <Link to="/docs"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-syne text-[14px] font-semibold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all">
                  <Icon.BookOpen size={14} /> Read the docs
                </Link>
              </div>
              <p className="mt-6 font-mono text-[11px] text-slate-400">MIT License · No account required · No telemetry</p>
            </div>
          </FadeUp>
        </div>
      </section>

    </PageWrapper>
  )
}