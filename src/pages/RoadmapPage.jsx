import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import PageWrapper from '@/components/PageWrapper'

/* ─── SVG Icons ──────────────────────────────────────────────────────────────── */
const Icon = {
  ChevronUp: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 9.5V2.5M2.5 6L6 2.5 9.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  MessageSquare: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  // Feature icons
  Database: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Table: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  WifiOff: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <line x1="1" y1="1" x2="23" y2="23" /><path d="M16.72 11.06A10.94 10.94 0 0119 12.55" /><path d="M5 12.55a10.94 10.94 0 015.17-2.39" /><path d="M10.71 5.05A16 16 0 0122.56 9" /><path d="M1.42 9a15.91 15.91 0 014.7-2.88" /><path d="M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Package: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Filter: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  Schema: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="2" y="3" width="6" height="4" rx="1" /><rect x="16" y="3" width="6" height="4" rx="1" /><rect x="9" y="10" width="6" height="4" rx="1" /><rect x="2" y="17" width="6" height="4" rx="1" /><rect x="16" y="17" width="6" height="4" rx="1" />
      <path d="M5 7v2.5a2.5 2.5 0 002.5 2.5H12M19 7v2.5A2.5 2.5 0 0116.5 12H12M12 14v3" />
    </svg>
  ),
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </svg>
  ),
  BarChart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Key: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  Cloud: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Puzzle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 7.65l.77.78L12 21l7.65-7.99.77-.78a5.4 5.4 0 000-7.65z" />
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  Lightbulb: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
    </svg>
  ),
}

/* ─── Status config ──────────────────────────────────────────────────────────── */
const STATUS = {
  shipped: { label: 'Shipped',  bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500',            barColor: '#10b981' },
  beta:    { label: 'Beta',     bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    dot: 'bg-blue-500 animate-pulse',  barColor: '#3b82f6' },
  soon:    { label: 'Soon',     bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   dot: 'bg-amber-400 animate-pulse', barColor: '#f59e0b' },
  planned: { label: 'Planned',  bg: 'bg-slate-100',  border: 'border-slate-200',   text: 'text-slate-500',   dot: 'bg-slate-400',               barColor: '#94a3b8' },
}

/* ─── Roadmap data ───────────────────────────────────────────────────────────── */
const PHASES = [
  {
    phase: 'v1.0 — Foundation',
    period: 'Shipped · Q1 2025',
    status: 'shipped',
    accent: '#10b981',
    items: [
      { Icon: Icon.Database, title: 'Visual Database Explorer', desc: 'Tree sidebar, inline create, rename and delete.',             status: 'shipped', votes: 412 },
      { Icon: Icon.Table,    title: 'Table & JSON Views',        desc: 'Spreadsheet and raw JSON toggle with instant switching.',     status: 'shipped', votes: 389 },
      { Icon: Icon.Edit,     title: 'Full CRUD Operations',      desc: 'Insert, edit, delete documents with live JSON validation.',   status: 'shipped', votes: 504 },
      { Icon: Icon.WifiOff,  title: 'Offline Cache',             desc: 'Data persists and stays readable when server is offline.',   status: 'shipped', votes: 278 },
      { Icon: Icon.Search,   title: 'Live Search',               desc: 'Real-time filter across all document fields instantly.',     status: 'shipped', votes: 356 },
      { Icon: Icon.Package,  title: 'npm One-line Install',      desc: 'Auto-detects platform, downloads the correct binary.',       status: 'shipped', votes: 631 },
    ],
  },
  {
    phase: 'v1.1 — Power Features',
    period: 'In Progress · Q2 2025',
    status: 'beta',
    accent: '#3b82f6',
    items: [
      { Icon: Icon.Filter,   title: 'Advanced Query Builder',  desc: 'Visual filters, sort, projections and aggregation pipelines.', status: 'beta',    votes: 847 },
      { Icon: Icon.Schema,   title: 'Schema Explorer',         desc: 'Inferred schemas, field types and data distribution view.',   status: 'beta',    votes: 612 },
      { Icon: Icon.Upload,   title: 'Import / Export',         desc: 'Bulk import from JSON/CSV, backup and restore collections.',  status: 'soon',    votes: 723 },
      { Icon: Icon.BarChart, title: 'Metrics Dashboard',       desc: 'Real-time charts for query performance and storage stats.',   status: 'soon',    votes: 689 },
    ],
  },
  {
    phase: 'v1.2 — Auth & Security',
    period: 'Coming · Q3 2025',
    status: 'soon',
    accent: '#8b5cf6',
    items: [
      { Icon: Icon.Lock,   title: 'Auth & User Management', desc: 'Role-based access, user accounts and API key management.',     status: 'soon',    votes: 934 },
      { Icon: Icon.Shield, title: 'Encrypted Storage',      desc: 'AES-256 encryption at rest for sensitive collection data.',    status: 'soon',    votes: 541 },
      { Icon: Icon.Key,    title: 'API Key Generator',      desc: 'Create and revoke scoped API keys with fine-grained access.',  status: 'planned', votes: 398 },
    ],
  },
  {
    phase: 'v2.0 — Cloud & Teams',
    period: 'Planned · Q4 2025',
    status: 'planned',
    accent: '#f97316',
    items: [
      { Icon: Icon.Cloud,  title: 'AstraCloud',        desc: 'Managed cloud hosting — one-click deploy, zero config.',            status: 'planned', votes: 1204 },
      { Icon: Icon.Users,  title: 'Team Workspaces',   desc: 'Share connections and collaborate on queries in real-time.',        status: 'planned', votes: 876 },
      { Icon: Icon.Puzzle, title: 'Plugin System',     desc: 'Extend AstraForge with community plugins and custom themes.',       status: 'planned', votes: 543 },
      { Icon: Icon.Globe,  title: 'Web Interface',     desc: 'Browser-based GUI — full functionality without a desktop install.', status: 'planned', votes: 1089 },
    ],
  },
]

const allItems = PHASES.flatMap(p => p.items)
const FILTERS = ['All', 'Shipped', 'Beta', 'Soon', 'Planned']

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

/* ─── Vote Button ────────────────────────────────────────────────────────────── */
function VoteButton({ count }) {
  const [voted, setVoted] = useState(false)
  const [n, setN] = useState(count)
  const toggle = (e) => {
    e.stopPropagation()
    setVoted(v => !v)
    setN(c => voted ? c - 1 : c + 1)
  }
  return (
    <button
      onClick={toggle}
      className={[
        'flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-xl border transition-all duration-200 flex-shrink-0 min-w-[44px]',
        voted
          ? 'bg-blue-600 border-blue-600 text-white shadow-[0_4px_10px_rgba(37,99,235,0.22)]'
          : 'bg-white border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600',
      ].join(' ')}
    >
      <Icon.ChevronUp />
      <span className="font-mono text-[10.5px] font-bold leading-none">{n >= 1000 ? `${(n/1000).toFixed(1)}k` : n}</span>
    </button>
  )
}

/* ─── Roadmap Card ───────────────────────────────────────────────────────────── */
function RoadmapCard({ item, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const s = STATUS[item.status]
  const ItemIcon = item.Icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_6px_20px_rgba(15,23,42,0.07)] transition-all duration-200 group"
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${s.bg} ${s.border} ${s.text}`}>
        <ItemIcon />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-syne text-[13.5px] font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{item.title}</span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${s.bg} ${s.border} ${s.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
            {s.label}
          </span>
        </div>
        <p className="text-[12.5px] text-slate-500 leading-[1.6] font-mono">{item.desc}</p>
      </div>

      {/* Vote */}
      <VoteButton count={item.votes} />
    </motion.div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function RoadmapPage() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? null
    : allItems.filter(i => i.status === filter.toLowerCase())

  const totalShipped = allItems.filter(i => i.status === 'shipped').length
  const totalItems   = allItems.length
  const pct          = Math.round((totalShipped / totalItems) * 100)

  return (
    <PageWrapper>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 xl:px-10 overflow-hidden bg-white">
        {/* Background decorations */}
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 65%)' }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.03) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, black 0%, transparent 70%)' }} />

        <div className="relative w-full max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Two-col on large screens: headline left, progress right */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

              {/* Left */}
              <div className="max-w-[580px]">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 font-mono text-[10.5px] tracking-[0.12em] uppercase text-orange-700 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  Public Roadmap
                </div>

                <h1 className="font-syne font-extrabold tracking-tight leading-[1.08] text-slate-900 mb-5"
                  style={{ fontSize: 'clamp(32px, 5vw, 58px)' }}>
                  What we're{' '}
                  <span className="text-blue-600">building next</span>
                </h1>

                <p className="text-[16px] text-slate-500 leading-[1.8] max-w-[500px]">
                  Our public roadmap — see what's shipped, in progress, and coming. Vote on features you want most.
                </p>
              </div>

              {/* Right: progress card */}
              <div className="w-full lg:w-[340px] flex-shrink-0">
                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-syne text-[13px] font-bold text-slate-900">Overall progress</span>
                    <span className="font-mono text-[12px] font-bold text-blue-600">{pct}%</span>
                  </div>

                  {/* Main bar */}
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                    />
                  </div>

                  {/* Status breakdown */}
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(STATUS).map(([key, s]) => {
                      const cnt = allItems.filter(i => i.status === key).length
                      return (
                        <div key={key} className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${s.bg} ${s.border}`}>
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot.replace(' animate-pulse', '')}`} />
                          <span className={`font-syne text-[12px] font-semibold ${s.text}`}>{s.label}</span>
                          <span className={`ml-auto font-mono text-[11px] font-bold ${s.text}`}>{cnt}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky filter bar ─────────────────────────────────────────────── */}
      <div className="sticky top-[64px] md:top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-10">
          <div className="flex items-center gap-1.5 py-3 overflow-x-auto scrollbar-none">
            {FILTERS.map(f => {
              const cnt = f === 'All' ? allItems.length : allItems.filter(i => i.status === f.toLowerCase()).length
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={[
                    'flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-syne text-[12.5px] font-semibold transition-all duration-150',
                    filter === f
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100',
                  ].join(' ')}
                >
                  {f}
                  <span className={`font-mono text-[10.5px] px-1.5 py-0.5 rounded-md ${filter === f ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {cnt}
                  </span>
                </button>
              )
            })}
            <div className="ml-auto flex-shrink-0 hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <Icon.ChevronUp />
              Vote for features
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 xl:px-10 py-10 pb-20 bg-slate-50">
        <div className="w-full max-w-[1400px] mx-auto">

          <AnimatePresence mode="wait">

            {/* Filtered view */}
            {filtered && (
              <motion.div
                key="filtered"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
              >
                {filtered.map((item, i) => (
                  <RoadmapCard key={item.title} item={item} delay={i * 0.03} />
                ))}
              </motion.div>
            )}

            {/* All phases view */}
            {!filtered && (
              <motion.div
                key="phases"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-14"
              >
                {PHASES.map((phase, pi) => {
                  const s = STATUS[phase.status]
                  return (
                    <div key={phase.phase}>
                      {/* Phase header */}
                      <FadeUp delay={0.04} className="flex flex-wrap items-center gap-3 mb-5">
                        {/* Number badge */}
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-syne text-[13px] font-extrabold flex-shrink-0"
                          style={{ background: phase.accent }}
                        >
                          {pi + 1}
                        </div>
                        <div>
                          <div className="font-syne text-[18px] font-extrabold text-slate-900 leading-tight">{phase.phase}</div>
                          <div className="font-mono text-[11px] text-slate-400">{phase.period}</div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${s.bg} ${s.border} ${s.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                        {/* Divider line */}
                        <div className="flex-1 h-px bg-slate-200 hidden sm:block min-w-[20px]" />
                        <span className="font-mono text-[11px] text-slate-400 hidden sm:block">
                          {phase.items.length} items
                        </span>
                      </FadeUp>

                      {/* Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {phase.items.map((item, ii) => (
                          <RoadmapCard key={item.title} item={item} delay={ii * 0.05} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* ── Request a feature ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 xl:px-10 py-16 bg-white border-t border-slate-100">
        <div className="w-full max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-600 shadow-sm">
                  <Icon.Lightbulb />
                </div>
                <div>
                  <h3 className="font-syne text-[20px] sm:text-[22px] font-extrabold text-slate-900 mb-1">
                    Don't see what you need?
                  </h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed max-w-[420px]">
                    Open a GitHub issue or start a discussion. The roadmap is shaped entirely by community feedback.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0 w-full lg:w-auto">
                <a
                  href="https://github.com/AnshulKhichi11/AstraDB/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-syne text-[13.5px] font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all"
                >
                  <Icon.Github />
                  Open GitHub Issue
                </a>
                <a
                  href="https://github.com/AnshulKhichi11/AstraDB/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-syne text-[13.5px] font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all"
                >
                  <Icon.MessageSquare />
                  Start a Discussion
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 xl:px-10 py-16 bg-slate-50 border-t border-slate-100">
        <div className="w-full max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10.5px] font-mono font-semibold text-emerald-700 tracking-[0.08em] uppercase mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  v1.0 Available Now
                </div>
                <h2 className="font-syne text-[22px] sm:text-[26px] font-extrabold text-slate-900 tracking-tight mb-1">
                  Use what's already built
                </h2>
                <p className="text-[14px] text-slate-500 leading-relaxed max-w-[400px]">
                  v1.0 is fully functional and free. Download AstraForge and start managing your databases today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                <Link
                  to="/download"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-syne text-[14px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_4px_12px_rgba(37,99,235,0.24)]"
                >
                  <Icon.Download />
                  Download Free
                </Link>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-syne text-[14px] font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all"
                >
                  See all features
                  <Icon.ArrowRight />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </PageWrapper>
  )
}