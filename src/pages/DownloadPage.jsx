import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import PageWrapper from '@/components/PageWrapper'
import { DOWNLOADS, RELEASE_VERSION, GITHUB_URL, NPM_PACKAGE } from '@/utils/constants'

/* ─── Utility: FadeUp ────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── SVG Icon set ──────────────────────────────────────────────────────── */
const Icons = {
  Windows: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  ),
  Apple: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  ),
  Linux: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.982-.058 2.01.027 3.043.012.626-.012 1.56-.337 2.15-.468 1.81-.465 1.15-1.39.608-1.935-.19-.17-.413-.276-.651-.356.325-.626.42-1.288.266-1.794-.071-.18-.146-.39-.271-.543-.26-.55-1.006-.607-1.546-.427.077-.348.12-.7.12-1.024.027-.668-.107-1.287-.356-1.84a9.43 9.43 0 00-.652-1.1 6.9 6.9 0 00-.693-.82 5.09 5.09 0 00-.713-.557.443.443 0 00-.2-.073c-.01-.01-.016-.02-.016-.03-.007-.037-.011-.073-.016-.11a2.667 2.667 0 00-.044-.26c-.027-.134-.063-.265-.107-.392a3.99 3.99 0 00-.394-.853 4.26 4.26 0 00-.66-.81 4.66 4.66 0 00-.916-.649A5.52 5.52 0 0012.505 0zm-.012 1.5c.264 0 .532.025.8.072.696.12 1.337.432 1.888.872.41.327.775.72 1.1 1.157.322.436.59.918.8 1.415.104.252.181.518.225.78a2.9 2.9 0 01.04.28c.006.07.01.14.01.21 0 .07-.004.13-.01.19l-.01.1c-.06.47-.27.916-.603 1.27-.337.354-.79.58-1.274.64a3.27 3.27 0 01-.406.025c-.37 0-.74-.073-1.082-.21a2.74 2.74 0 01-.907-.594 2.73 2.73 0 01-.587-.915 2.87 2.87 0 01-.207-1.073c0-.37.07-.737.207-1.075.136-.338.334-.648.587-.909.253-.262.553-.47.885-.608.332-.14.687-.208 1.044-.208zm-5.93 2.094a3.7 3.7 0 00-1.49.33 3.51 3.51 0 00-1.166.884 3.48 3.48 0 00-.7 1.312 3.64 3.64 0 00-.074 1.5 3.58 3.58 0 00.547 1.389 3.5 3.5 0 001.008.993c.4.255.847.415 1.316.47.47.054.948.002 1.392-.152.447-.155.852-.412 1.186-.752.335-.34.593-.752.757-1.205.163-.452.226-.937.183-1.416a3.587 3.587 0 00-.496-1.482 3.527 3.527 0 00-1.009-.993 3.49 3.49 0 00-1.454-.478z" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Copy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  ),
  Package: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Terminal: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  Server: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Link: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  BookOpen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
}

/* ─── AstraForge Logo ────────────────────────────────────────────────────── */
function AstraForgeLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#0F172A" />
      <path d="M16 5L7 12.5V20L16 27L25 20V12.5L16 5Z" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M16 10L11 14V19L16 23L21 19V14L16 10Z" fill="#3B82F6" opacity="0.2" />
      <path d="M16 10L21 14M16 10L11 14M21 14V19M11 14V19M21 19L16 23M11 19L16 23" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="16" cy="16.5" r="2.5" fill="#3B82F6" />
    </svg>
  )
}

/* ─── OS Icon by name ───────────────────────────────────────────────────── */
function OSIcon({ name }) {
  if (name?.toLowerCase().includes('windows')) return <Icons.Windows />
  if (name?.toLowerCase().includes('mac')) return <Icons.Apple />
  return <Icons.Linux />
}

/* ─── Clock Icon ─────────────────────────────────────────────────────────── */
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

/* ─── OS Card ───────────────────────────────────────────────────────────── */
function OSCard({ os, index, isSelected, onSelect }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [downloading, setDownloading] = useState(null)

  // Determine if this OS is coming soon (not Windows)
  const isComingSoon = !os.name?.toLowerCase().includes('windows')

  const handleDownload = (file) => {
    if (isComingSoon) return
    setDownloading(file.label)
    const a = document.createElement('a')
    a.href = file.url
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => setDownloading(null), 2000)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onClick={!isComingSoon ? onSelect : undefined}
      className={[
        'relative rounded-2xl p-6',
        'border transition-all duration-300 overflow-hidden group',
        isComingSoon
          ? 'bg-slate-50 border-slate-200 cursor-default opacity-75'
          : isSelected
            ? 'bg-white border-blue-500/40 shadow-[0_0_0_1px_rgba(59,130,246,0.3),0_24px_48px_rgba(59,130,246,0.08)] cursor-pointer'
            : 'bg-white border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.05)] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 cursor-pointer',
      ].join(' ')}
    >
      {/* Subtle top accent when selected */}
      {isSelected && !isComingSoon && (
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600" />
      )}

      {/* Coming Soon badge */}
      {isComingSoon && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-medium text-amber-700 tracking-wide">
          <ClockIcon />
          Coming Soon
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className={[
          'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
          isComingSoon
            ? 'bg-slate-100 text-slate-400'
            : isSelected
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200',
        ].join(' ')}>
          <OSIcon name={os.name} />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className={`font-semibold text-[15px] tracking-tight ${isComingSoon ? 'text-slate-500' : 'text-slate-900'}`}>
            {os.name}
          </div>
          <div className="text-[12px] text-slate-400 font-mono mt-0.5">{os.arch}</div>
        </div>
        {isSelected && !isComingSoon && (
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icons.Check />
          </div>
        )}
      </div>

      {/* Files */}
      <div className="flex flex-col gap-2">
        {isComingSoon ? (
          /* Placeholder disabled buttons for coming soon */
          os.files.map((file) => (
            <div
              key={file.label}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-[13px] font-medium text-slate-400 cursor-not-allowed select-none"
            >
              <div className="flex items-center gap-2.5">
                <Icons.Download />
                <div>
                  <div>{file.label}</div>
                  {file.sublabel && (
                    <div className="text-[11px] font-mono mt-0.5 text-slate-400">{file.sublabel}</div>
                  )}
                </div>
              </div>
              <span className="font-mono text-[11px] text-slate-300 ml-4">{file.size ?? '—'}</span>
            </div>
          ))
        ) : (
          os.files.map((file) => (
            <button
              key={file.label}
              onClick={(e) => { e.stopPropagation(); handleDownload(file) }}
              className={[
                'flex items-center justify-between w-full px-4 py-3 rounded-xl text-left transition-all duration-200',
                'border text-[13px] font-medium',
                file.primary
                  ? 'bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white shadow-[0_4px_12px_rgba(37,99,235,0.24)]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700',
              ].join(' ')}
            >
              <div className="flex items-center gap-2.5">
                <span className={downloading === file.label ? 'animate-spin' : ''}>
                  {downloading === file.label
                    ? <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                    : <Icons.Download />
                  }
                </span>
                <div>
                  <div>{downloading === file.label ? 'Downloading…' : file.label}</div>
                  {file.sublabel && (
                    <div className={`text-[11px] font-mono mt-0.5 ${file.primary ? 'text-blue-200' : 'text-slate-400'}`}>
                      {file.sublabel}
                    </div>
                  )}
                </div>
              </div>
              <span className={`font-mono text-[11px] flex-shrink-0 ml-4 ${file.primary ? 'text-blue-200' : 'text-slate-400'}`}>
                {file.size}
              </span>
            </button>
          ))
        )}
      </div>

      {/* Coming soon notice */}
      {isComingSoon && (
        <p className="mt-4 text-[11.5px] text-slate-400 text-center leading-relaxed">
          Build in progress. Check back soon or watch the GitHub releases.
        </p>
      )}
    </motion.div>
  )
}

/* ─── npm Copy Box ──────────────────────────────────────────────────────── */
function NpmBox() {
  const [copied, setCopied] = useState(false)
  const CMD = `npm install -g ${NPM_PACKAGE}`

  const copy = () => {
    navigator.clipboard.writeText(CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <FadeUp delay={0.1}>
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
        {/* Terminal bar */}
        <div className="px-5 py-3 bg-[#0d1117] flex items-center gap-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>
          <span className="font-mono text-[11px] text-slate-500 tracking-wider uppercase ml-1">terminal</span>
        </div>

        {/* Command */}
        <div className="px-5 sm:px-7 py-5 bg-[#0d1117]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10.5px] text-slate-500 uppercase tracking-[0.12em] mb-2.5">
                Install AstraDB server engine
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-600 font-mono text-[15px] select-none">$</span>
                <code className="font-mono text-[14px] sm:text-[15px] text-emerald-400 break-all">{CMD}</code>
              </div>
            </div>
            <button
              onClick={copy}
              className={[
                'flex-shrink-0 flex items-center gap-2 h-9 px-5 rounded-lg text-[12.5px] font-medium transition-all',
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10',
              ].join(' ')}
            >
              {copied ? <><Icons.Check /><span>Copied</span></> : <><Icons.Copy /><span>Copy</span></>}
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 font-mono text-[11.5px] text-slate-600">
            Verify: <code className="text-slate-400">astradb --version</code>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

/* ─── Installation Steps ────────────────────────────────────────────────── */
const STEPS = [
  {
    n: '01',
    title: 'Download for your platform',
    desc: 'Select your operating system above and click the primary download button for the recommended installer.',
    Icon: Icons.Download,
    color: '#3b82f6',
  },
  {
    n: '02',
    title: 'Run the installer',
    desc: 'Windows: run the .exe installer. macOS: open the .dmg and drag to Applications. Linux: chmod +x and execute the AppImage.',
    Icon: Icons.Package,
    color: '#8b5cf6',
  },
  {
    n: '03',
    title: 'Install AstraDB via npm',
    desc: `Open a terminal and run: npm install -g ${NPM_PACKAGE ?? 'astradb'} to install the database engine.`,
    Icon: Icons.Terminal,
    color: '#10b981',
  },
  {
    n: '04',
    title: 'Start the server',
    desc: 'Run astradb start in your terminal. The server will be available at http://localhost:8080.',
    Icon: Icons.Server,
    color: '#f59e0b',
  },
  {
    n: '05',
    title: 'Connect and you\'re ready',
    desc: 'Open AstraForge, enter localhost and port 8080, then click Connect. Your database is live.',
    Icon: Icons.Link,
    color: '#ef4444',
  },
]

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function DownloadPage() {
  const [selectedOS, setSelectedOS] = useState(0)
  const osEntries = Object.values(DOWNLOADS)

  return (
    <PageWrapper>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-14 px-4 sm:px-8 xl:px-12 overflow-hidden bg-white">
        {/* Subtle grid bg */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(15,23,42,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,0.03) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 75% 60% at 50% 0%, black 0%, transparent 70%)',
          }}
        />
        {/* Blue glow */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
        />

        <div className="relative w-full max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[680px]"
          >
            {/* Version badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[11.5px] font-mono text-blue-700 tracking-[0.06em] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {RELEASE_VERSION} — Latest stable release
            </div>

            <h1 className="font-semibold tracking-[-0.03em] leading-[1.1] text-slate-900 mb-4"
              style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
              Download <span className="text-blue-600">AstraForge</span>
            </h1>

            <p className="text-[16px] sm:text-[17px] text-slate-500 leading-[1.75] max-w-[480px] mb-8">
              No account required. No telemetry. Just a direct, clean download for Windows, macOS, and Linux.
            </p>

            {/* Platform tags */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'Windows', Icon: Icons.Windows },
                { label: 'macOS', Icon: Icons.Apple },
                { label: 'Linux', Icon: Icons.Linux },
              ].map(({ label, Icon }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-[12px] text-slate-600 font-medium">
                  <Icon />
                  {label}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[12px] text-emerald-700 font-medium">
                MIT License
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Download Cards ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 xl:px-12 pb-12 bg-slate-50 border-t border-slate-100">
        <div className="w-full max-w-[1400px] mx-auto">

          {/* Section label */}
          <FadeUp>
            <div className="flex items-center justify-between pt-8 pb-5">
              <h2 className="text-[13px] font-semibold text-slate-500 uppercase tracking-[0.1em]">
                Select your platform
              </h2>
              <a
                href={`${GITHUB_URL}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] text-slate-500 hover:text-slate-900 transition-colors font-medium"
              >
                <Icons.Github />
                View all releases
              </a>
            </div>
          </FadeUp>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {osEntries.map((os, i) => (
              <OSCard
                key={os.name}
                os={os}
                index={i}
                isSelected={selectedOS === i}
                onSelect={() => setSelectedOS(i)}
              />
            ))}
          </div>

          {/* npm Box */}
          <div className="mt-5">
            <NpmBox />
          </div>

          {/* Footnote */}
          <FadeUp delay={0.15}>
            <p className="mt-5 text-center font-mono text-[11.5px] text-slate-400">
              All binaries are signed and checksums are available on GitHub Releases.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Installation Steps ───────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 xl:px-12 py-20 bg-white border-t border-slate-100">
        <div className="w-full max-w-[1400px] mx-auto">

          <FadeUp className="mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-500 tracking-[0.1em] uppercase mb-4">
              Installation Guide
            </div>
            <h2 className="font-semibold tracking-[-0.025em] text-slate-900"
              style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}>
              Up and running in five steps
            </h2>
            <p className="text-[15px] text-slate-500 mt-2 max-w-[460px] leading-relaxed">
              Follow this guide to get AstraForge and AstraDB set up on your machine.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5">
            {STEPS.map((step, i) => {
              const Icon = step.Icon
              return (
                <FadeUp key={step.n} delay={i * 0.07}>
                  <div className="relative h-full p-5 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)] hover:-translate-y-0.5 transition-all duration-300">
                    {/* Step number */}
                    <div className="text-[11px] font-mono text-slate-400 mb-3 tracking-[0.08em]">{step.n}</div>
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${step.color}12`, color: step.color, border: `1px solid ${step.color}20` }}
                    >
                      <Icon />
                    </div>
                    <div className="font-semibold text-[14px] text-slate-900 mb-2 leading-snug">{step.title}</div>
                    <p className="text-[12.5px] text-slate-500 leading-[1.7]">{step.desc}</p>

                    {/* Connector arrow — visible on md+ except last */}
                    {i < STEPS.length - 1 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center z-10 bg-white border border-slate-200 rounded-full shadow-sm text-slate-400">
                        <Icons.ArrowRight />
                      </div>
                    )}
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── System Requirements ──────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 xl:px-12 py-20 bg-slate-50 border-t border-slate-100">
        <div className="w-full max-w-[1400px] mx-auto">

          <FadeUp className="mb-10">
            <h2 className="font-semibold tracking-[-0.025em] text-slate-900 mb-1"
              style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
              System Requirements
            </h2>
            <p className="text-[14px] text-slate-500">Minimum requirements to run AstraForge and AstraDB.</p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  Icon: Icons.Windows,
                  name: 'Windows',
                  accentColor: '#0078d4',
                  reqs: ['Windows 10 (x64 / ARM64)', 'Node.js 18 or later', '4 GB RAM minimum', '200 MB disk space'],
                },
                {
                  Icon: Icons.Apple,
                  name: 'macOS',
                  accentColor: '#444444',
                  reqs: ['macOS 11 Big Sur or later', 'Apple Silicon or Intel', 'Node.js 18 or later', '200 MB disk space'],
                },
                {
                  Icon: Icons.Linux,
                  name: 'Linux',
                  accentColor: '#f59e0b',
                  reqs: ['Ubuntu 20.04+ / Debian 11+', 'x64 or ARM64 architecture', 'Node.js 18 or later', '200 MB disk space'],
                },
              ].map((r) => {
                const Icon = r.Icon
                return (
                  <div key={r.name} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${r.accentColor}10`, color: r.accentColor }}
                      >
                        <Icon />
                      </div>
                      <span className="font-semibold text-[15px] text-slate-900">{r.name}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {r.reqs.map((req, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: r.accentColor }} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 xl:px-12 py-20 bg-white border-t border-slate-100">
        <FadeUp>
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <AstraForgeLogo size={28} />
                </div>
                <div>
                  <h2 className="font-semibold text-[18px] sm:text-[22px] text-slate-900 tracking-tight mb-1">
                    Need help getting started?
                  </h2>
                  <p className="text-[14px] text-slate-500 leading-relaxed max-w-[400px]">
                    The documentation covers detailed installation, configuration options, connection strings, and the full API reference.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-medium text-[14px] text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-[0_4px_12px_rgba(37,99,235,0.24)]"
                >
                  <Icons.BookOpen />
                  Read the Docs
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-medium text-[14px] text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                >
                  <Icons.Info />
                  How it works
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

    </PageWrapper>
  )
}