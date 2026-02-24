import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageWrapper from '@/components/PageWrapper'
import { FEATURES, ROADMAP, TESTIMONIALS, DOWNLOADS } from '@/utils/constants'

/* ─── SVG Icons ─────────────────────────────────────────────────────────────── */
const Icon = {
  Windows: () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" /></svg>),
  Apple: () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>),
  Linux: () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.982-.058 2.01.027 3.043.012.626-.012 1.56-.337 2.15-.468 1.81-.465 1.15-1.39.608-1.935-.19-.17-.413-.276-.651-.356.325-.626.42-1.288.266-1.794-.071-.18-.146-.39-.271-.543-.26-.55-1.006-.607-1.546-.427.077-.348.12-.7.12-1.024.027-.668-.107-1.287-.356-1.84a9.43 9.43 0 00-.652-1.1 6.9 6.9 0 00-.693-.82 5.09 5.09 0 00-.713-.557.443.443 0 00-.2-.073c-.01-.01-.016-.02-.016-.03-.007-.037-.011-.073-.016-.11a2.667 2.667 0 00-.044-.26c-.027-.134-.063-.265-.107-.392a3.99 3.99 0 00-.394-.853 4.26 4.26 0 00-.66-.81 4.66 4.66 0 00-.916-.649A5.52 5.52 0 0012.505 0zm-.012 1.5c.264 0 .532.025.8.072.696.12 1.337.432 1.888.872.41.327.775.72 1.1 1.157.322.436.59.918.8 1.415.104.252.181.518.225.78a2.9 2.9 0 01.04.28c.006.07.01.14.01.21 0 .07-.004.13-.01.19l-.01.1c-.06.47-.27.916-.603 1.27-.337.354-.79.58-1.274.64a3.27 3.27 0 01-.406.025c-.37 0-.74-.073-1.082-.21a2.74 2.74 0 01-.907-.594 2.73 2.73 0 01-.587-.915 2.87 2.87 0 01-.207-1.073c0-.37.07-.737.207-1.075.136-.338.334-.648.587-.909.253-.262.553-.47.885-.608.332-.14.687-.208 1.044-.208zm-5.93 2.094a3.7 3.7 0 00-1.49.33 3.51 3.51 0 00-1.166.884 3.48 3.48 0 00-.7 1.312 3.64 3.64 0 00-.074 1.5 3.58 3.58 0 00.547 1.389 3.5 3.5 0 001.008.993c.4.255.847.415 1.316.47.47.054.948.002 1.392-.152.447-.155.852-.412 1.186-.752.335-.34.593-.752.757-1.205.163-.452.226-.937.183-1.416a3.587 3.587 0 00-.496-1.482 3.527 3.527 0 00-1.009-.993 3.49 3.49 0 00-1.454-.478z" /></svg>),
  Database: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>),
  Table: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></svg>),
  Edit: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>),
  WifiOff: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="1" y1="1" x2="23" y2="23" /><path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>),
  Search: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  Package: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>),
  Terminal: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>),
  Link: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>),
  Lock: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>),
  BarChart: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>),
  Cloud: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /></svg>),
  Users: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>),
  ArrowRight: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>),
  Github: () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>),
  Star: () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
  Download: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>),
  BookOpen: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>),
  Check: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12" /></svg>),
  Zap: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
  Server: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>),
}

/* ─── Resolvers ─────────────────────────────────────────────────────────────── */
function OSIcon({ name }) {
  if (name?.toLowerCase().includes('windows')) return <Icon.Windows />
  if (name?.toLowerCase().includes('mac')) return <Icon.Apple />
  return <Icon.Linux />
}

const FEATURE_ICON_MAP = { explorer: Icon.Database, database: Icon.Database, table: Icon.Table, json: Icon.Table, crud: Icon.Edit, edit: Icon.Edit, offline: Icon.WifiOff, cache: Icon.WifiOff, search: Icon.Search, install: Icon.Package, npm: Icon.Package }
function resolveFeatureIcon(f) {
  const key = Object.keys(FEATURE_ICON_MAP).find(k => f.title?.toLowerCase().includes(k) || f.id?.toLowerCase().includes(k))
  const Ico = FEATURE_ICON_MAP[key] || Icon.Database
  return <Ico />
}

const ROADMAP_ICON_MAP = { auth: Icon.Lock, user: Icon.Lock, metric: Icon.BarChart, chart: Icon.BarChart, cloud: Icon.Cloud, team: Icon.Users, workspace: Icon.Users }
function resolveRoadmapIcon(item) {
  const key = Object.keys(ROADMAP_ICON_MAP).find(k => item.title?.toLowerCase().includes(k))
  const Ico = ROADMAP_ICON_MAP[key] || Icon.Server
  return <Ico />
}

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
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

/* ══════════════════════════════════════════════════════════════
   HERO — asymmetric two-column, no logo, animated tagline
══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const canvasRef = useRef(null)
  const { scrollY } = useScroll()
  const meshY = useTransform(scrollY, [0, 600], [0, 50])
  const [taglineIndex, setTaglineIndex] = useState(0)
  const TAGLINES = ['Browse collections.', 'Execute queries.', 'Insert documents.', 'Ship faster.']

  useEffect(() => {
    const t = setInterval(() => setTaglineIndex(i => (i + 1) % TAGLINES.length), 2200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); let W, H, particles = [], raf
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const COLORS = ['rgba(59,130,246,', 'rgba(99,102,241,', 'rgba(14,165,233,', 'rgba(148,163,184,']
    const mkP = () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + 0.3, vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14, a: Math.random() * 0.13 + 0.03, c: COLORS[Math.floor(Math.random() * COLORS.length)] })
    for (let i = 0; i < 65; i++) particles.push(mkP())
    const draw = () => { ctx.clearRect(0, 0, W, H); particles.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.c + p.a + ')'; ctx.fill(); p.x += p.vx; p.y += p.vy; if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) Object.assign(p, mkP()) }); raf = requestAnimationFrame(draw) }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    const h = e => { const m = document.getElementById('hero-mesh'); if (!m) return; m.style.transform = `translate(${(e.clientX / window.innerWidth - 0.5) * 12}px,${(e.clientY / window.innerHeight - 0.5) * 8}px)` }
    window.addEventListener('mousemove', h, { passive: true }); return () => window.removeEventListener('mousemove', h)
  }, [])

  const ctn = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
  const itm = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-[80px] pb-16 px-4 sm:px-8 xl:px-12 overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <motion.div id="hero-mesh" className="absolute inset-0 pointer-events-none z-0 transition-transform duration-[1200ms] ease-out" style={{ y: meshY, background: `radial-gradient(ellipse 65% 50% at 60% 20%,rgba(59,130,246,0.11) 0%,transparent 60%),radial-gradient(ellipse 40% 35% at 10% 85%,rgba(99,102,241,0.08) 0%,transparent 55%),radial-gradient(ellipse 35% 30% at 90% 65%,rgba(14,165,233,0.07) 0%,transparent 55%)` }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.035) 1px,transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%,black 0%,transparent 75%)' }} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <motion.div variants={ctn} initial="hidden" animate="show">
            <motion.div variants={itm} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-[11px] text-emerald-700 tracking-[0.07em] mb-7">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open Source · v1.0.2 · Cross-Platform
            </motion.div>

            <motion.h1 variants={itm} className="font-syne font-black text-slate-900 tracking-[-0.02em] leading-[1.05] mb-5" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>
              The database<br />
              <span className="text-blue-600">studio</span> for<br />
              AstraDB
            </motion.h1>

            {/* Animated cycling tagline */}
            <motion.div variants={itm} className="h-7 mb-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p key={taglineIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="font-mono text-[14px] sm:text-[15px] text-slate-400 tracking-wide">
                  {TAGLINES[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p variants={itm} className="text-[15px] sm:text-[16px] text-slate-500 leading-[1.8] max-w-[480px] mb-9">
              A clean, powerful desktop GUI for AstraDB. Browse collections, run queries, manage data — from an app that feels fast and professional.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itm} className="flex flex-wrap gap-3 mb-8">
              <Link to="/download" className="inline-flex items-center gap-2 h-11 sm:h-12 px-6 sm:px-7 rounded-xl font-syne text-[14px] font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(37,99,235,0.30)]">
                <Icon.Download /> Download Free
              </Link>
              <Link to="/docs" className="inline-flex items-center gap-2 h-11 sm:h-12 px-6 sm:px-7 rounded-xl font-syne text-[14px] font-semibold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all">
                <Icon.BookOpen /> Docs
              </Link>
              <a href="https://github.com/AnshulKhichi11/AstraDB" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 sm:h-12 px-5 rounded-xl font-syne text-[14px] font-semibold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-all">
                <Icon.Github /> <span className="hidden sm:inline">GitHub</span>
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={itm} className="flex flex-wrap gap-4">
              {['No account required', 'MIT License', 'No telemetry'].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 text-[12px] font-mono text-emerald-600">
                  <Icon.Check /> {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — terminal + stats (desktop only) */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="hidden lg:flex flex-col gap-4">
            {/* Terminal */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.07)]">
              <div className="px-5 py-3 bg-[#0d1117] flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-amber-500/60" /><div className="w-3 h-3 rounded-full bg-emerald-500/60" /></div>
                <span className="font-mono text-[11px] text-slate-500 ml-1 uppercase tracking-wider">Quick start</span>
              </div>
              <div className="bg-[#0d1117] p-6 font-mono text-[13px] space-y-2.5">
                <div className="text-[10.5px] text-slate-600 uppercase tracking-wider mb-4">Install &amp; launch</div>
                {[
                  { prompt: '$', cmd: 'npm install -g astradb', color: 'text-slate-300' },
                  { prompt: '$', cmd: 'astradb start',          color: 'text-slate-300' },
                  { prompt: '→', cmd: 'Server ready at localhost:8080', color: 'text-emerald-400' },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-slate-600 select-none w-4 flex-shrink-0">{l.prompt}</span>
                    <span className={l.color}>{l.cmd}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { n: '3',    label: 'Platforms',     sub: 'Win · Mac · Linux' },
                { n: 'MIT',  label: 'License',        sub: 'Free forever' },
                { n: 'v1.0', label: 'Stable release', sub: 'Latest build' },
              ].map(s => (
                <div key={s.label} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_8px_rgba(15,23,42,0.04)] text-center">
                  <div className="font-syne font-extrabold text-[22px] text-slate-900 mb-0.5">{s.n}</div>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-slate-500">{s.label}</div>
                  <div className="font-mono text-[9.5px] text-slate-400 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Platform pills */}
            <div className="grid grid-cols-3 gap-2">
              {[{ I: Icon.Windows, l: 'Windows' }, { I: Icon.Apple, l: 'macOS' }, { I: Icon.Linux, l: 'Linux' }].map(({ I, l }) => (
                <div key={l} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 bg-white text-[12px] font-medium text-slate-600"><I />{l}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.6 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-slate-300 mx-auto" />
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════════════════════ */
const MARQUEE_ITEMS = ['Visual Explorer', 'Table & JSON Views', 'CRUD Operations', 'Offline Cache', 'Cross-Platform', 'npm Install', 'Live Search', 'WAL Engine', 'REST API', 'Auto Checkpoint']
function MarqueeSection() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="overflow-hidden border-y border-slate-200 bg-slate-50">
      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-8 py-3.5 border-r border-slate-200 whitespace-nowrap font-syne text-[11.5px] font-semibold tracking-[0.08em] uppercase text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 flex-shrink-0" />{item}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   FEATURES
══════════════════════════════════════════════════════════════ */
const ACCENT = {
  violet: { bg: 'rgba(99,102,241,0.09)',  border: 'rgba(99,102,241,0.2)',  color: '#6366f1' },
  cyan:   { bg: 'rgba(14,165,233,0.09)',  border: 'rgba(14,165,233,0.2)',  color: '#0ea5e9' },
  green:  { bg: 'rgba(16,185,129,0.09)',  border: 'rgba(16,185,129,0.2)',  color: '#10b981' },
  yellow: { bg: 'rgba(245,158,11,0.09)',  border: 'rgba(245,158,11,0.2)',  color: '#f59e0b' },
  red:    { bg: 'rgba(239,68,68,0.09)',   border: 'rgba(239,68,68,0.2)',   color: '#ef4444' },
  purple: { bg: 'rgba(59,130,246,0.09)',  border: 'rgba(59,130,246,0.2)',  color: '#3b82f6' },
}

function FeatureCard({ f, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const accent = ACCENT[f.accent] || ACCENT.purple
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -3 }}
      className={['relative rounded-2xl p-6 bg-white border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-all duration-300', f.wide ? 'sm:col-span-2' : ''].join(' ')}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center border mb-4" style={{ background: accent.bg, borderColor: accent.border, color: accent.color }}>{resolveFeatureIcon(f)}</div>
      <h3 className="font-syne text-[16px] font-extrabold text-slate-900 mb-1.5">{f.title}</h3>
      <p className="text-[13.5px] text-slate-500 leading-[1.75]">{f.desc}</p>
      {f.code && <div className="mt-4 p-3.5 rounded-xl bg-slate-900 font-mono text-[11.5px] leading-[1.75] text-emerald-400 overflow-x-auto">{f.code}</div>}
    </motion.div>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-24 px-4 sm:px-8 xl:px-12 bg-white">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 mb-12 items-end">
          <FadeUp>
            <SectionLabel>Features</SectionLabel>
            <h2 className="font-syne font-extrabold tracking-tight leading-[1.1] text-slate-900 mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>Built for developers<br />who ship</h2>
            <p className="text-[14.5px] text-slate-500 leading-[1.8]">Clean UI, practical workflows, and the tools you actually need.</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="flex flex-wrap gap-2">
              {['No config required', 'Offline-ready', 'Cross-platform', 'MIT License', 'Live search', 'JSON + Table views'].map(feat => (
                <span key={feat} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-[12px] font-medium text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />{feat}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => <FeatureCard key={f.title} f={f} index={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════════════════════════ */
function HowSection() {
  const steps = [
    { n: '01', Icon: Icon.Package,  title: 'Install AstraDB',   desc: 'Install the database engine globally using npm.', cmd: 'npm install -g astradb' },
    { n: '02', Icon: Icon.Terminal, title: 'Start the server',  desc: 'Launch AstraDB locally on localhost:8080.',        cmd: 'astradb start' },
    { n: '03', Icon: Icon.Link,     title: 'Connect & explore', desc: 'Open AstraForge and connect with host + port.',    cmd: null },
  ]
  return (
    <section id="how" className="py-20 sm:py-24 px-4 sm:px-8 xl:px-12 bg-slate-50 border-y border-slate-200">
      <div className="w-full max-w-[1400px] mx-auto">
        <FadeUp className="mb-12">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-syne font-extrabold tracking-tight leading-[1.1] text-slate-900" style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}>Setup in three steps</h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((s, i) => {
            const StepIcon = s.Icon
            return (
              <FadeUp key={s.n} delay={i * 0.1}>
                <div className="relative h-full p-7 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition-all duration-300">
                  {i < 2 && <div className="hidden sm:flex absolute -right-[9px] top-12 z-10 w-[18px] h-[18px] rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center text-slate-400"><Icon.ArrowRight /></div>}
                  <div className="font-mono text-[10.5px] font-semibold text-slate-400 mb-5 tracking-[0.14em] uppercase">Step {s.n}</div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-5"><StepIcon /></div>
                  <h3 className="font-syne text-[16px] font-extrabold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-[13.5px] text-slate-500 leading-[1.75] mb-5">{s.desc}</p>
                  {s.cmd && <div className="inline-block px-4 py-2 rounded-lg bg-slate-900 font-mono text-[12px] text-emerald-400">{s.cmd}</div>}
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   VIDEO
══════════════════════════════════════════════════════════════ */
function VideoSection() {
  return (
    <section id="tutorial" className="py-20 sm:py-24 px-4 sm:px-8 xl:px-12 bg-white">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-center">
          <FadeUp>
            <SectionLabel>Tutorial</SectionLabel>
            <h2 className="font-syne font-extrabold tracking-tight leading-[1.1] text-slate-900 mb-4" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>See it in<br />action</h2>
            <p className="text-[14px] text-slate-500 leading-relaxed mb-6">Install AstraDB, launch the server, and connect AstraForge in under two minutes.</p>
            <Link to="/docs" className="inline-flex items-center gap-2 text-[13px] font-syne font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Read the full guide <Icon.ArrowRight />
            </Link>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_8px_32px_rgba(15,23,42,0.07)]" style={{ aspectRatio: '16/9' }}>
              <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/Aa-OOJGbcY0" title="AstraForge Tutorial" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-3 tracking-wide">Replace the YouTube URL with your actual tutorial video.</p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   DOWNLOAD PREVIEW
══════════════════════════════════════════════════════════════ */
function DownloadPreviewSection() {
  return (
    <section id="download-preview" className="py-20 sm:py-24 px-4 sm:px-8 xl:px-12 bg-slate-50 border-y border-slate-200">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeUp>
            <SectionLabel>Download</SectionLabel>
            <h2 className="font-syne font-extrabold tracking-tight leading-[1.1] mb-4 text-slate-900" style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}>Available on every<br />platform</h2>
            <p className="text-[15px] text-slate-500 mb-8 leading-relaxed max-w-[360px]">Free forever. No account required. Direct download for Windows, macOS, and Linux.</p>
            <Link to="/download" className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-syne text-[14px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_4px_12px_rgba(37,99,235,0.24)]">
              <Icon.Download /> View all downloads
            </Link>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-3">
              {Object.values(DOWNLOADS).map(os => {
                const isComingSoon = !os.name?.toLowerCase().includes('windows')
                return (
                  <div key={os.name} className={['flex items-center justify-between p-4 rounded-2xl border transition-all duration-200', isComingSoon ? 'bg-slate-100/80 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 cursor-pointer'].join(' ')}>
                    <div className="flex items-center gap-3">
                      <div className={['w-10 h-10 rounded-xl flex items-center justify-center border', isComingSoon ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-700'].join(' ')}><OSIcon name={os.name} /></div>
                      <div>
                        <div className={`font-syne text-[14px] font-bold ${isComingSoon ? 'text-slate-400' : 'text-slate-900'}`}>{os.name}</div>
                        <div className="font-mono text-[11px] text-slate-400 mt-0.5">{isComingSoon ? 'Coming soon' : os.arch}</div>
                      </div>
                    </div>
                    {!isComingSoon
                      ? <span className="inline-flex items-center gap-1.5 text-[12.5px] font-syne font-semibold text-blue-600">Download <Icon.ArrowRight /></span>
                      : <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-mono font-semibold text-amber-700">Soon</span>
                    }
                  </div>
                )
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const COLORS = ['bg-blue-600', 'bg-indigo-600', 'bg-slate-700']
  return (
    <section id="testimonials" className="py-20 sm:py-24 px-4 sm:px-8 xl:px-12 bg-white">
      <div className="w-full max-w-[1400px] mx-auto">
        <FadeUp className="mb-12">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-syne font-extrabold tracking-tight text-slate-900" style={{ fontSize: 'clamp(22px, 3vw, 38px)' }}>Loved by developers</h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.07}>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)] h-full flex flex-col hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-all duration-300">
                <div className="flex gap-0.5 mb-4">{Array.from({ length: t.rating }).map((_, j) => <Icon.Star key={j} />)}</div>
                <p className="text-[13.5px] text-slate-600 leading-[1.75] flex-1 mb-5">"{t.text}"</p>
                <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-syne text-[13px] font-bold text-white flex-shrink-0 ${COLORS[i % COLORS.length]}`}>{t.avatar}</div>
                  <div>
                    <div className="font-syne text-[13px] font-bold text-slate-900">{t.name}</div>
                    <div className="font-mono text-[11px] text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   ROADMAP
══════════════════════════════════════════════════════════════ */
const STATUS_STYLE = {
  soon:    { bg: 'rgba(245,158,11,0.09)',   border: 'rgba(245,158,11,0.22)',   color: '#92400e', label: 'Coming soon', iconColor: '#f59e0b' },
  beta:    { bg: 'rgba(59,130,246,0.09)',   border: 'rgba(59,130,246,0.22)',   color: '#1e3a8a', label: 'In beta',     iconColor: '#3b82f6' },
  planned: { bg: 'rgba(148,163,184,0.13)',  border: 'rgba(148,163,184,0.25)',  color: '#475569', label: 'Planned',    iconColor: '#64748b' },
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 sm:py-24 px-4 sm:px-8 xl:px-12 bg-slate-50 border-y border-slate-200">
      <div className="w-full max-w-[1400px] mx-auto">
        <FadeUp className="mb-12">
          <SectionLabel>Roadmap</SectionLabel>
          <h2 className="font-syne font-extrabold tracking-tight leading-[1.1] mb-3 text-slate-900" style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}>What's coming next</h2>
          <p className="text-[14.5px] text-slate-500 max-w-[420px]">Actively building the next generation of features.</p>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROADMAP.map((item, i) => {
            const s = STATUS_STYLE[item.status] || STATUS_STYLE.planned
            return (
              <FadeUp key={item.title} delay={(i % 4) * 0.07}>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)] h-full flex flex-col gap-3 hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ background: s.bg, borderColor: s.border, color: s.iconColor }}>{resolveRoadmapIcon(item)}</div>
                  <span className="inline-block self-start px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold tracking-[0.07em] uppercase" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>{s.label}</span>
                  <div className="font-syne text-[15px] font-extrabold text-slate-900">{item.title}</div>
                  <div className="text-[13px] text-slate-500 leading-[1.7] flex-1">{item.desc}</div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   OPEN SOURCE — dark panel (added section)
══════════════════════════════════════════════════════════════ */
function OpenSourceSection() {
  return (
    <section className="py-14 px-4 sm:px-8 xl:px-12 bg-white">
      <div className="w-full max-w-[1400px] mx-auto">
        <FadeUp>
          <div className="rounded-2xl bg-slate-900 p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7">
            <div className="flex items-start gap-5">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-white"><Icon.Github /></div>
              <div>
                <h3 className="font-syne font-extrabold text-[19px] sm:text-[22px] text-white tracking-tight mb-1.5">Fully open source</h3>
                <p className="text-[13.5px] text-slate-400 leading-relaxed max-w-[420px]">AstraForge and AstraDB are both MIT licensed. Read the code, contribute, or fork it. Built in public, for the community.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <a href="https://github.com/AnshulKhichi11/AstraDB" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-syne text-[13px] font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all">
                <Icon.Github /> View on GitHub
              </a>
              <a href="https://www.npmjs.com/package/astradb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-syne text-[13px] font-bold text-white border border-white/20 hover:bg-white/10 transition-all">
                npm package
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   CTA
══════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-24 sm:py-28 px-4 sm:px-8 xl:px-12 bg-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 65% at 50% 50%,rgba(59,130,246,0.07) 0%,transparent 70%)' }} />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%,black 0%,transparent 70%)' }} />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <FadeUp>
          <div className="text-center max-w-[580px] mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 font-mono text-[10.5px] text-blue-700 tracking-[0.1em] uppercase mb-7">
              <Icon.Zap /> Start for free
            </div>
            <h2 className="font-syne font-black tracking-tight leading-[1.08] mb-5 text-slate-900" style={{ fontSize: 'clamp(28px, 5vw, 54px)' }}>Ready to ship faster?</h2>
            <p className="text-[15px] sm:text-[16px] text-slate-500 mb-10 leading-[1.8]">Download AstraForge free. Works on Windows, macOS, and Linux. No setup, no account, no friction.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/download" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-syne text-[14.5px] font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(37,99,235,0.28)]">
                <Icon.Download /> Download Free
              </Link>
              <Link to="/docs" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-syne text-[14.5px] font-semibold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all">
                <Icon.BookOpen /> Read the docs
              </Link>
            </div>
            <p className="mt-6 font-mono text-[11px] text-slate-400">MIT License · No account required · No telemetry</p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <MarqueeSection />
      <FeaturesSection />
      <HowSection />
      <VideoSection />
      <DownloadPreviewSection />
      <TestimonialsSection />
      <RoadmapSection />
      <OpenSourceSection />
      <CTASection />
    </PageWrapper>
  )
}