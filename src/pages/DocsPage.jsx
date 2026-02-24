import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '@/components/PageWrapper'
import { DOCS_SECTIONS } from '@/utils/constants'

/* ─── SVG Icons ──────────────────────────────────────────────────────────────── */
const Icon = {
  Copy:          () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>),
  Check:         () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"/></svg>),
  Info:          () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>),
  CheckCircle:   () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>),
  AlertTriangle: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>),
  ChevronLeft:   () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="15 18 9 12 15 6"/></svg>),
  ChevronRight:  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg>),
  Menu:          () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>),
  Close:         () => (<svg viewBox="0 0 14 14" fill="none" className="w-4 h-4"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  ExternalLink:  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>),
  Zap:           () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  Package:       () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>),
  Search:        () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  BarChart:      () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>),
  Lock:          () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>),
  Database:      () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>),
  RefreshCw:     () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>),
  Globe:         () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>),
  HardDrive:     () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>),
  Shield:        () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
  Monitor:       () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>),
  Edit:          () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>),
  Settings:      () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>),
  Mail:          () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
  Github:        () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>),
  BookOpen:      () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>),
}

/* ─── Primitives ─────────────────────────────────────────────────────────────── */
function Code({ lang = 'text', children }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(String(children ?? '').trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 my-5">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-400 select-none">{lang}</span>
        <button
          onClick={copy}
          className={['flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all', copied ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-500 bg-white border-slate-200 hover:border-slate-300 hover:text-slate-800'].join(' ')}
        >
          {copied ? <><Icon.Check /><span>Copied</span></> : <><Icon.Copy /><span>Copy</span></>}
        </button>
      </div>
      <pre className="px-5 py-4 font-mono text-[12.5px] leading-[1.75] text-slate-800 overflow-x-auto whitespace-pre bg-white">
        {String(children ?? '').trim()}
      </pre>
    </div>
  )
}

function InfoBox({ type = 'note', children }) {
  const S = {
    note: { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-800',    ic: 'text-blue-500',    Ico: Icon.Info },
    tip:  { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', ic: 'text-emerald-500', Ico: Icon.CheckCircle },
    warn: { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-800',   ic: 'text-amber-500',   Ico: Icon.AlertTriangle },
  }
  const s = S[type] || S.note
  return (
    <div className={`flex gap-3 p-4 rounded-xl my-4 text-[13px] leading-[1.7] border ${s.bg} ${s.border} ${s.text}`}>
      <span className={`flex-shrink-0 mt-0.5 ${s.ic}`}><s.Ico /></span>
      <div>{children}</div>
    </div>
  )
}

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4 mb-5">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-600 font-mono text-[11px] font-bold text-white mt-0.5">{n}</div>
      <div>
        <div className="font-syne text-[14px] font-bold text-slate-900 mb-0.5">{title}</div>
        <div className="text-[13.5px] text-slate-600 leading-[1.7]">{children}</div>
      </div>
    </div>
  )
}

const Inline = ({ children }) => (
  <code className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded-md text-[12px] border border-slate-200">{children}</code>
)

const H2 = ({ children }) => (
  <h2 className="font-syne text-[22px] font-extrabold text-slate-900 mb-4 tracking-tight">{children}</h2>
)

const H3 = ({ children }) => (
  <h3 className="font-syne text-[11px] font-bold text-slate-500 mb-2 mt-6 uppercase tracking-[0.1em]">{children}</h3>
)

function FeatureRow({ Ico, children }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 last:border-0">
      <span className="text-blue-500 flex-shrink-0"><Ico /></span>
      <span className="text-[13.5px] text-slate-700">{children}</span>
    </div>
  )
}

function CompatRow({ children }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 last:border-0">
      <span className="text-emerald-500 flex-shrink-0"><Icon.CheckCircle /></span>
      <span className="text-[13.5px] text-slate-700">{children}</span>
    </div>
  )
}

function LinkRow({ label, href, to }) {
  const cls = "text-[12.5px] font-mono text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 flex-shrink-0"
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
      <span className="text-[13.5px] text-slate-700 font-medium">{label}</span>
      {href
        ? <a href={href} target="_blank" rel="noreferrer" className={cls}>{href.replace('https://', '')} <Icon.ExternalLink /></a>
        : <Link to={to} className={cls}>{to}</Link>
      }
    </div>
  )
}

/* ─── Doc content map ────────────────────────────────────────────────────────── */
const DOC_CONTENT = {
  overview: (
    <div>
      <H2>AstraDB Overview</H2>
      <p className="text-[14.5px] text-slate-600 leading-[1.8] mb-5">
        The lightweight, fast, and embeddable document database for Node.js — with a MongoDB-style API. No setup, no separate process, just install and go.
      </p>
      <InfoBox type="note">
        AstraDB supports both <Inline>Embedded Mode</Inline> (in-process) and <Inline>Server/Client Mode</Inline> (REST API over HTTP).
      </InfoBox>
      <H3>Quick Links</H3>
      <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
        <LinkRow label="Website"                href="https://astradb.dev" />
        <LinkRow label="Documentation"          href="https://docs.astradb.dev" />
        <LinkRow label="npm"                    href="https://www.npmjs.com/package/astradb" />
        <LinkRow label="AstraForge Desktop GUI" to="/docs/astraforge" />
      </div>
    </div>
  ),

  features: (
    <div>
      <H2>Features</H2>
      <p className="text-[14px] text-slate-500 leading-relaxed mb-5">Everything included out of the box — no plugins needed.</p>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <FeatureRow Ico={Icon.Zap}>Zero Configuration — works immediately after install</FeatureRow>
        <FeatureRow Ico={Icon.Package}>Embedded Database — no separate server process needed</FeatureRow>
        <FeatureRow Ico={Icon.Database}>MongoDB-Style API — familiar query syntax from day one</FeatureRow>
        <FeatureRow Ico={Icon.BarChart}>Fast Performance — segment-based storage with WAL engine</FeatureRow>
        <FeatureRow Ico={Icon.Lock}>Schema Validation — optional per-collection field validation</FeatureRow>
        <FeatureRow Ico={Icon.Search}>Built-in Indexes — hash and BTree index support</FeatureRow>
        <FeatureRow Ico={Icon.RefreshCw}>Auto Compaction — automatic storage optimization</FeatureRow>
        <FeatureRow Ico={Icon.Globe}>REST API — full HTTP server mode included</FeatureRow>
        <FeatureRow Ico={Icon.HardDrive}>Persistent Storage — data survives process restarts</FeatureRow>
        <FeatureRow Ico={Icon.Shield}>TypeScript Support — full type definitions included</FeatureRow>
      </div>
    </div>
  ),

  installation: (
    <div>
      <H2>Installation</H2>
      <Step n="1" title="Install AstraDB via npm">Install the package:</Step>
      <Code lang="bash">{`npm install astradb`}</Code>
      <Step n="2" title="TypeScript users (optional)">Install Node.js type definitions if needed:</Step>
      <Code lang="bash">{`npm install -D @types/node`}</Code>
      <InfoBox type="tip">
        AstraDB works with modern Node.js versions. See <Link className="underline underline-offset-2 font-medium" to="/docs/compatibility">Compatibility</Link> for the full list.
      </InfoBox>
    </div>
  ),

  'quick-start': (
    <div>
      <H2>Quick Start</H2>
      <p className="text-[14.5px] text-slate-600 leading-[1.75] mb-5">Choose one of three modes based on your use case.</p>
      <InfoBox type="note">
        Start with <Inline>Embedded Mode</Inline> for most apps. Use <Inline>Server Mode</Inline> when you need HTTP access or multi-process access.
      </InfoBox>
      <Step n="A" title="Embedded Mode — in-process">Best for desktop apps, prototypes, testing, and offline-first apps.</Step>
      <Code lang="javascript">{`const { AstraDB } = require('astradb');

const db = new AstraDB('./data');

const id = await db.insert('users', 'profiles', {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

const users = await db.query('users', 'profiles', {
  age: { $gt: 25 }
});

console.log(users);`}</Code>
      <Step n="B" title="Server Mode — REST API">Run AstraDB as an HTTP server.</Step>
      <Code lang="bash">{`npx astradb start
# Server running on http://localhost:8080`}</Code>
      <Step n="C" title="Client Mode — HTTP">Connect from another Node.js process.</Step>
      <Code lang="javascript">{`const { AstraClient } = require('astradb/client');

const client = new AstraClient('http://localhost:8080');

await client.insert('users', 'profiles', {
  name: 'Alice Smith',
  age: 28
});

const results = await client.query('users', 'profiles', {
  age: { $gte: 25 }
});`}</Code>
    </div>
  ),

  'embedded-mode': (
    <div>
      <H2>Embedded Mode</H2>
      <p className="text-[14.5px] text-slate-600 leading-[1.75] mb-4">Runs AstraDB inside your Node.js process — no external server required.</p>
      <Code lang="javascript">{`const { AstraDB } = require('astradb');
const db = new AstraDB('./data');`}</Code>
      <InfoBox type="tip">Ideal for Electron desktop apps and local developer tooling.</InfoBox>
    </div>
  ),

  'server-mode': (
    <div>
      <H2>Server Mode</H2>
      <Step n="1" title="Start via CLI">Run on the default port <Inline>8080</Inline>.</Step>
      <Code lang="bash">{`npx astradb start`}</Code>
      <Step n="2" title="Start programmatically">Control port and data directory from code:</Step>
      <Code lang="javascript">{`const { AstraServer } = require('astradb/server');

const server = new AstraServer({
  port: 8080,
  dataDir: './data'
});

server.start();`}</Code>
    </div>
  ),

  'client-mode': (
    <div>
      <H2>Client Mode</H2>
      <p className="text-[14.5px] text-slate-600 leading-[1.75] mb-4">Use the client SDK to connect to a running AstraDB server over HTTP.</p>
      <Code lang="javascript">{`const { AstraClient } = require('astradb/client');
const client = new AstraClient('http://localhost:8080');`}</Code>
    </div>
  ),

  'db-ops': (
    <div>
      <H2>Database Operations</H2>
      <Code lang="javascript">{`const db = new AstraDB('./data');

const databases   = await db.getDatabases();
const collections = await db.getCollections('mydb');
const stats       = await db.getStats('mydb');`}</Code>
    </div>
  ),

  insert: (
    <div>
      <H2>Insert Documents</H2>
      <Code lang="javascript">{`// Insert single document
const id = await db.insert('mydb', 'users', {
  name: 'John',
  email: 'john@example.com'
});

// Insert with custom _id
await db.insert('mydb', 'users', {
  _id: 'user_123',
  name: 'Alice'
});`}</Code>
    </div>
  ),

  query: (
    <div>
      <H2>Query Documents</H2>
      <Code lang="javascript">{`// Find all documents
const all = await db.query('mydb', 'users', {});

// Find with filter
const adults = await db.query('mydb', 'users', {
  age: { $gte: 18 }
});

// Find with options
const results = await db.query('mydb', 'users',
  { status: 'active' },
  {
    sort: { created: -1 },
    limit: 10,
    skip: 0,
    projection: { name: 1, email: 1 }
  }
);`}</Code>
    </div>
  ),

  update: (
    <div>
      <H2>Update Documents</H2>
      <Code lang="javascript">{`// Update one document
const updated = await db.update('mydb', 'users',
  { name: 'John' },
  { $set: { age: 31 } }
);

// Update multiple documents
await db.update('mydb', 'users',
  { status: 'inactive' },
  { $set: { archived: true } },
  { multi: true }
);`}</Code>
    </div>
  ),

  delete: (
    <div>
      <H2>Delete Documents</H2>
      <Code lang="javascript">{`// Delete one document
const deleted = await db.delete('mydb', 'users', {
  _id: 'user_123'
});

// Delete multiple documents
await db.delete('mydb', 'users',
  { status: 'banned' },
  { multi: true }
);`}</Code>
    </div>
  ),

  'query-operators': (
    <div>
      <H2>Query Operators</H2>
      <H3>Comparison</H3>
      <Code lang="javascript">{`{ age:    { $gt: 25 } }
{ age:    { $gte: 18 } }
{ age:    { $lt: 65 } }
{ age:    { $lte: 30 } }
{ status: { $ne: 'inactive' } }
{ role:   { $in: ['admin', 'moderator'] } }
{ status: { $nin: ['banned', 'deleted'] } }`}</Code>
      <H3>Logical</H3>
      <Code lang="javascript">{`// AND (implicit)
{ age: { $gte: 18 }, status: 'active' }

// OR
{ $or: [{ role: 'admin' }, { level: { $gt: 10 } }] }

// AND (explicit)
{ $and: [{ age: { $gte: 18 } }, { verified: true }] }`}</Code>
      <H3>Element</H3>
      <Code lang="javascript">{`{ email:     { $exists: true } }
{ deletedAt: { $exists: false } }`}</Code>
      <H3>String</H3>
      <Code lang="javascript">{`{ name:  { $regex: 'john' } }
{ email: { $regex: '@gmail.com' } }`}</Code>
      <H3>Array</H3>
      <Code lang="javascript">{`{
  tags: {
    $elemMatch: {
      value: 'javascript',
      level: { $gte: 5 }
    }
  }
}`}</Code>
    </div>
  ),

  'update-operators': (
    <div>
      <H2>Update Operators</H2>
      <Code lang="javascript">{`{ $set:    { status: 'active', verified: true } }
{ $inc:    { score: 10, visits: 1 } }
{ $unset:  { tempData: '' } }
{ $push:   { tags: 'new-tag' } }
{ $pull:   { tags: 'old-tag' } }
{ $rename: { oldName: 'newName' } }`}</Code>
    </div>
  ),

  'schema-validation': (
    <div>
      <H2>Schema Validation</H2>
      <p className="text-[14.5px] text-slate-600 leading-[1.75] mb-4">Define schemas to enforce structure and prevent invalid writes.</p>
      <Code lang="javascript">{`await db.createSchema('mydb', 'users', {
  fields: {
    name:   { type: 'string',  required: true,  minLength: 2, maxLength: 100 },
    email:  { type: 'string',  required: true,  format: 'email' },
    age:    { type: 'number',  min: 0,          max: 150 },
    role:   { type: 'string',  enum: ['user', 'admin', 'moderator'] },
    active: { type: 'boolean', required: true }
  },
  strict: true
});

try {
  await db.insert('mydb', 'users', {
    name: 'John',
    email: 'invalid-email',
    age: 200
  });
} catch (error) {
  console.error(error.message);
}`}</Code>
      <InfoBox type="warn">When <Inline>strict</Inline> is enabled, documents with extra fields are rejected.</InfoBox>
    </div>
  ),

  indexing: (
    <div>
      <H2>Indexing</H2>
      <Code lang="javascript">{`// Hash index — exact match, supports unique
await db.createIndex('mydb', 'users', ['email'], 'hash', {
  unique: true
});

// BTree index — range queries
await db.createIndex('mydb', 'users', ['age'], 'btree');

// Compound index
await db.createIndex('mydb', 'users', ['status', 'created'], 'hash');

// Indexes are used automatically
const result = await db.query('mydb', 'users', {
  email: 'john@example.com'
});`}</Code>
      <InfoBox type="tip">Use <Inline>hash</Inline> for exact match lookups and <Inline>btree</Inline> for range-based queries.</InfoBox>
    </div>
  ),

  'rest-api': (
    <div>
      <H2>REST API</H2>
      <p className="text-[14.5px] text-slate-600 leading-[1.75] mb-4">HTTP endpoints available in server mode on <Inline>localhost:8080</Inline>.</p>
      <H3>Insert</H3>
      <Code lang="bash">{`POST /api/insert
Content-Type: application/json

{
  "db": "mydb",
  "collection": "users",
  "data": { "name": "John", "email": "john@example.com" }
}`}</Code>
      <H3>Query</H3>
      <Code lang="bash">{`POST /api/query
Content-Type: application/json

{
  "db": "mydb",
  "collection": "users",
  "filter": { "age": { "$gt": 25 } },
  "sort": { "name": 1 },
  "limit": 10
}`}</Code>
      <H3>Update</H3>
      <Code lang="bash">{`POST /api/update
Content-Type: application/json

{
  "db": "mydb",
  "collection": "users",
  "filter": { "name": "John" },
  "update": { "$set": { "age": 31 } }
}`}</Code>
      <H3>Delete</H3>
      <Code lang="bash">{`POST /api/delete
Content-Type: application/json

{
  "db": "mydb",
  "collection": "users",
  "filter": { "_id": "user_123" }
}`}</Code>
      <H3>Stats</H3>
      <Code lang="bash">{`GET /api/stats?db=mydb`}</Code>
    </div>
  ),

  configuration: (
    <div>
      <H2>Configuration</H2>
      <Code lang="javascript">{`const db = new AstraDB('./data', {
  dataDir:              './data',
  walSyncMode:          'batch',           // 'immediate' | 'batch' | 'async'
  walBatchSize:         100,
  checkpointInterval:   60,               // seconds
  enableAutoCompaction: true,
  compactionInterval:   300,              // seconds
  compactionThreshold:  3,               // segments
  maxDocSize:           16 * 1024 * 1024, // 16 MB
  maxWALSize:           10 * 1024 * 1024  // 10 MB
});`}</Code>
    </div>
  ),

  typescript: (
    <div>
      <H2>TypeScript Support</H2>
      <Code lang="typescript">{`import { AstraDB } from 'astradb';

interface User {
  _id?:     string;
  name:     string;
  email:    string;
  age:      number;
  created?: number;
}

const db = new AstraDB('./data');

const id = await db.insert<User>('mydb', 'users', {
  name: 'John',
  email: 'john@example.com',
  age: 30
});

const users = await db.query<User>('mydb', 'users', {
  age: { $gte: 25 }
});`}</Code>
      <InfoBox type="tip">Type definitions ship with the package — no <Inline>@types/astradb</Inline> needed.</InfoBox>
    </div>
  ),

  performance: (
    <div>
      <H2>Performance</H2>
      <p className="text-[14.5px] text-slate-600 leading-[1.75] mb-4">Benchmarks on MacBook Pro M1 (2021):</p>
      <div className="rounded-xl border border-slate-200 overflow-hidden mb-4">
        {[
          { op: 'Insert',            val: '15,000+ docs/sec' },
          { op: 'Query (indexed)',   val: '50,000+ docs/sec' },
          { op: 'Query (full scan)', val: '10,000+ docs/sec' },
          { op: 'Update',            val: '12,000+ docs/sec' },
          { op: 'Delete',            val: '15,000+ docs/sec' },
        ].map((r, i) => (
          <div key={r.op} className={`flex items-center justify-between px-4 py-3 border-b border-slate-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}>
            <span className="font-mono text-[12.5px] text-slate-600">{r.op}</span>
            <span className="font-mono text-[12.5px] font-bold text-emerald-600">{r.val}</span>
          </div>
        ))}
      </div>
      <InfoBox type="note">Storage is segment-based with WAL and auto-compaction for efficient disk usage.</InfoBox>
    </div>
  ),

  compatibility: (
    <div>
      <H2>Compatibility</H2>
      <H3>Node.js Versions</H3>
      <div className="rounded-xl border border-slate-200 overflow-hidden mb-5">
        {['Node.js 16.x', 'Node.js 18.x', 'Node.js 20.x', 'Node.js 22.x'].map(v => <CompatRow key={v}>{v}</CompatRow>)}
      </div>
      <H3>Platforms</H3>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        {['Windows (x64)', 'macOS (x64, ARM64)', 'Linux (x64, ARM64)'].map(p => <CompatRow key={p}>{p}</CompatRow>)}
      </div>
    </div>
  ),

  comparison: (
    <div>
      <H2>Comparison</H2>
      <InfoBox type="note">AstraDB is best for embedded and local use cases — not a replacement for distributed production databases.</InfoBox>
      <div className="rounded-xl border border-slate-200 overflow-hidden mt-4">
        <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200">
          {['Feature', 'AstraDB', 'MongoDB', 'SQLite'].map(h => (
            <div key={h} className="px-3 sm:px-4 py-3 font-syne text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide">{h}</div>
          ))}
        </div>
        {[
          ['Setup',       'Zero config',   'Server required', 'Zero config'],
          ['Query API',   'MongoDB-style', 'Native',          'SQL'],
          ['Persistence', 'File-based',    'File-based',      'File-based'],
          ['Indexes',     'Yes',           'Yes',             'Yes'],
          ['Schemas',     'Optional',      'Optional',        'Required'],
          ['Bundle',      '~5 MB',         '~500 MB',         '~1 MB'],
        ].map((row, i) => (
          <div key={row[0]} className={`grid grid-cols-4 border-b border-slate-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
            {row.map((cell, ci) => (
              <div key={ci} className={`px-3 sm:px-4 py-3 text-[11.5px] sm:text-[12.5px] ${ci === 0 ? 'font-semibold text-slate-700' : ci === 1 ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),

  'use-cases': (
    <div>
      <H2>Use Cases</H2>
      <div className="rounded-xl border border-slate-200 overflow-hidden mb-4">
        {[
          [Icon.Monitor,   'Desktop applications (Electron)'],
          [Icon.HardDrive, 'Mobile apps with offline-first architecture'],
          [Icon.Zap,       'Prototyping and rapid development'],
          [Icon.Database,  'Small to medium datasets'],
          [Icon.Settings,  'Embedded systems and CLI tools'],
        ].map(([Ico, label]) => (
          <div key={label} className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 last:border-0">
            <span className="text-blue-500 flex-shrink-0"><Ico /></span>
            <span className="text-[13.5px] text-slate-700">{label}</span>
          </div>
        ))}
      </div>
      <InfoBox type="warn">Not recommended for high-concurrency production systems, distributed architectures, or multi-TB datasets.</InfoBox>
    </div>
  ),

  astraforge: (
    <div>
      <H2>AstraForge Desktop GUI</H2>
      <p className="text-[14.5px] text-slate-600 leading-[1.75] mb-5">The official desktop GUI for AstraDB — built for developers who care about their tools.</p>
      <div className="rounded-xl border border-slate-200 overflow-hidden mb-5">
        {[
          [Icon.Monitor,  'Clean, modern interface — no config required'],
          [Icon.BarChart, 'Real-time metrics dashboard'],
          [Icon.Search,   'Visual query builder with filters and projections'],
          [Icon.Edit,     'Schema editor with validation support'],
          [Icon.Database, 'Document viewer — table and JSON modes'],
          [Icon.Settings, 'Full CRUD — insert, edit, and delete documents'],
        ].map(([Ico, label]) => (
          <div key={label} className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 last:border-0">
            <span className="text-blue-500 flex-shrink-0"><Ico /></span>
            <span className="text-[13.5px] text-slate-700">{label}</span>
          </div>
        ))}
      </div>
      <Step n="1" title="Install and launch">Install globally and run:</Step>
      <Code lang="bash">{`npm install -g astraforge
astraforge`}</Code>
      <InfoBox type="note">Pre-built binaries are available on the <Link className="underline underline-offset-2 font-medium" to="/download">Downloads page</Link>.</InfoBox>
    </div>
  ),

  cli: (
    <div>
      <H2>CLI Commands</H2>
      <Code lang="bash">{`# Start server on default port
npx astradb start

# Start on custom port
npx astradb start --port 3000

# Start with custom data directory
npx astradb start --data ./mydata

# Check version
npx astradb --version

# Show help
npx astradb --help`}</Code>
    </div>
  ),

  roadmap: (
    <div>
      <H2>Roadmap</H2>
      <div className="space-y-3 mb-5">
        {[
          { version: 'v2.1', period: 'Q2 2026', items: ['Transactions support', 'Geospatial queries', 'Full-text search', 'Aggregation pipeline'] },
          { version: 'v3.0', period: 'Q4 2026', items: ['Replication', 'Sharding', 'GraphQL API', 'Cloud sync'] },
        ].map(r => (
          <div key={r.version} className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <span className="font-syne text-[14px] font-bold text-slate-900">{r.version}</span>
              <span className="font-mono text-[11px] text-slate-400">{r.period}</span>
            </div>
            {r.items.map(item => (
              <div key={item} className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-100 last:border-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="text-[13.5px] text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <InfoBox type="note">Roadmap may change based on community feedback and priorities.</InfoBox>
    </div>
  ),

  license: (
    <div>
      <H2>License & Support</H2>
      <p className="text-[14.5px] text-slate-600 leading-[1.75] mb-5">MIT © 2024–present AstraDB Contributors</p>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <span className="text-slate-400 flex-shrink-0"><Icon.Mail /></span>
          <span className="text-[13.5px] text-slate-700">Email: <Inline>support@astradb.dev</Inline></span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <span className="text-slate-400 flex-shrink-0"><Icon.Github /></span>
          <span className="text-[13.5px] text-slate-700">
            Issues: <a href="https://github.com/AnshulKhichi11/AstraDB/issues" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">GitHub Issues</a>
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="text-slate-400 flex-shrink-0"><Icon.BookOpen /></span>
          <span className="text-[13.5px] text-slate-700">Docs: <Inline>docs.astradb.dev</Inline></span>
        </div>
      </div>
    </div>
  ),
}

/* ─── Sidebar component ──────────────────────────────────────────────────────── */
function Sidebar({ active, onNav }) {
  return (
    <nav className="flex flex-col gap-6">
      {DOCS_SECTIONS.map(sec => (
        <div key={sec.id}>
          <div className="font-syne text-[10.5px] font-bold tracking-[0.16em] uppercase text-slate-400 mb-2 px-1">
            {sec.label}
          </div>
          <div className="flex flex-col gap-0.5">
            {sec.items.map(item => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className={[
                  'w-full text-left px-3 py-2.5 rounded-xl text-[13px] transition-all duration-150 leading-tight',
                  active === item.id
                    ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

/* ─── Main Page ──────────────────────────────────────────────────────────────── */
export default function DocsPage() {
  const { section = 'installation' } = useParams()
  const [active, setActive]         = useState(section)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate   = useNavigate()
  const contentRef = useRef(null)

  const allItems    = DOCS_SECTIONS.flatMap(s => s.items)
  const idx         = allItems.findIndex(i => i.id === active)
  const prev        = allItems[idx - 1]
  const next        = allItems[idx + 1]
  const activeLabel = allItems.find(i => i.id === active)?.label ?? 'Docs'
  const content     = DOC_CONTENT[active] || DOC_CONTENT.installation

  useEffect(() => {
    setActive(section)
    setDrawerOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [section])

  const handleNav = id => {
    setActive(id)
    navigate(`/docs/${id}`, { replace: true })
    setDrawerOpen(false)
  }

  return (
    <PageWrapper>

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="pt-24 pb-8 px-4 sm:px-6 xl:px-10 bg-white border-b border-slate-200">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 font-mono text-[10.5px] tracking-[0.12em] uppercase text-slate-500 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Documentation
              </div>
              <h1 className="font-syne font-extrabold tracking-tight text-[28px] sm:text-[38px] text-slate-900 leading-tight mb-1.5">
                AstraForge Docs
              </h1>
              <p className="text-[14.5px] text-slate-500">
                Everything you need to install, connect, and use AstraForge with AstraDB.
              </p>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden self-start sm:self-auto flex items-center gap-2.5 h-10 pl-3 pr-4 rounded-xl border border-slate-200 bg-white text-[13px] font-syne font-semibold text-slate-700 hover:bg-slate-50 transition-all flex-shrink-0"
            >
              <Icon.Menu />
              <span className="truncate max-w-[160px]">{activeLabel}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[800] bg-slate-900/20 backdrop-blur-[2px] md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-[900] w-[min(300px,85vw)] bg-white shadow-[20px_0_60px_rgba(15,23,42,0.1)] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 flex-shrink-0">
                <span className="font-syne text-[13px] font-bold text-slate-900">Documentation</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <Icon.Close />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 pb-8">
                <Sidebar active={active} onNav={handleNav} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-10 py-8 pb-24">
        <div className="flex gap-8 xl:gap-12">

          {/* Desktop sidebar */}
          <aside className="w-[220px] xl:w-[240px] flex-shrink-0 hidden md:block">
            <div className="sticky top-[82px] max-h-[calc(100vh-100px)] overflow-y-auto pr-1 pb-4">
              <Sidebar active={active} onNav={handleNav} />
            </div>
          </aside>

          {/* Content pane */}
          <main ref={contentRef} className="flex-1 min-w-0">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
            >
              {content}
            </motion.div>

            {/* Prev / Next nav */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {prev ? (
                <button
                  onClick={() => handleNav(prev.id)}
                  className="flex items-center gap-2.5 p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-left group"
                >
                  <span className="text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0">
                    <Icon.ChevronLeft />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-slate-400 mb-0.5">Previous</div>
                    <div className="font-syne text-[12px] sm:text-[13px] font-semibold text-slate-800 truncate">{prev.label}</div>
                  </div>
                </button>
              ) : <div />}

              {next ? (
                <button
                  onClick={() => handleNav(next.id)}
                  className="flex items-center justify-end gap-2.5 p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-right group"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-slate-400 mb-0.5">Next</div>
                    <div className="font-syne text-[12px] sm:text-[13px] font-semibold text-slate-800 truncate">{next.label}</div>
                  </div>
                  <span className="text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0">
                    <Icon.ChevronRight />
                  </span>
                </button>
              ) : <div />}
            </div>
          </main>
        </div>
      </div>

    </PageWrapper>
  )
}