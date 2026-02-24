// ─── Download links ───────────────────────────────────────────────────────────
// Update these with your actual GitHub Release direct download URLs
export const RELEASE_VERSION = 'v1.0.0'
export const GITHUB_URL = 'https://github.com/Anshul-max121/Astrawebsite'
export const NPM_PACKAGE = 'astradb'

export const DOWNLOADS = {
  windows: {
    name: 'Windows',
    emoji: '🪟',
    color: 'rgba(0,120,212,0.12)',
    border: 'rgba(0,120,212,0.22)',
    arch: 'x64 · ARM64',
    files: [
      {
        label: 'Installer (.exe)',
        sublabel: 'Recommended',
        size: '~75.5 MB',
        icon: '⬇',
        primary: true,
        url: `${GITHUB_URL}/releases/download/${RELEASE_VERSION}/AstraForge.Setup.1.0.0.exe`,
      },
      {
        label: 'Portable (.zip)',
        sublabel: 'No install needed',
        size: '~8.8 MB',
        icon: '📦',
        primary: false,
        url: `${GITHUB_URL}/releases/download/${RELEASE_VERSION}/AstraForge-${RELEASE_VERSION}-win-x64.zip`,
      },
    ],
  },
  macos: {
    name: 'macOS',
    emoji: '🍎',
    color: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.1)',
    arch: 'Apple Silicon · Intel x64',
    files: [
      {
        label: 'Apple Silicon (.dmg)',
        sublabel: 'M1 / M2 / M3',
        size: '~8.9 MB',
        icon: '⬇',
        primary: true,
        url: `${GITHUB_URL}/releases/download/${RELEASE_VERSION}/AstraForge-${RELEASE_VERSION}-mac-arm64.dmg`,
      },
      {
        label: 'Intel x64 (.dmg)',
        sublabel: 'Intel Mac',
        size: '~9.5 MB',
        icon: '⬇',
        primary: false,
        url: `${GITHUB_URL}/releases/download/${RELEASE_VERSION}/AstraForge-${RELEASE_VERSION}-mac-x64.dmg`,
      },
    ],
  },
  linux: {
    name: 'Linux',
    emoji: '🐧',
    color: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.15)',
    arch: 'x64 · ARM64',
    files: [
      {
        label: 'Linux x64 (.AppImage)',
        sublabel: 'Universal',
        size: '~9.3 MB',
        icon: '⬇',
        primary: true,
        url: `${GITHUB_URL}/releases/download/${RELEASE_VERSION}/AstraForge-${RELEASE_VERSION}-linux-x64.AppImage`,
      },
      {
        label: 'Linux ARM64',
        sublabel: 'Raspberry Pi & ARM',
        size: '~8.6 MB',
        icon: '⬇',
        primary: false,
        url: `${GITHUB_URL}/releases/download/${RELEASE_VERSION}/AstraForge-${RELEASE_VERSION}-linux-arm64.AppImage`,
      },
    ],
  },
}

// ─── Nav links ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Features',    href: '/#features' },
  { label: 'How it works', href: '/#how' },
  { label: 'Download',    href: '/download' },
  { label: 'Docs',        href: '/docs' },
  { label: 'Roadmap',     href: '/#roadmap' },
]

// ─── Features ─────────────────────────────────────────────────────────────────
export const FEATURES = [
  {
    icon: '🗂️',
    title: 'Visual Database Explorer',
    desc: 'Navigate all your databases and collections in a clean tree sidebar. Create inline with keyboard shortcuts — no CLI needed.',
    accent: 'violet',
    wide: true,
    code: `astradb start\n✅ Server ready → localhost:8080\n🗂  Databases: hospitaldb, blogdb, iotdb`,
  },
  {
    icon: '📋',
    title: 'Table & JSON Views',
    desc: 'Spreadsheet-style table with color-coded types or raw JSON — switch any time with a click.',
    accent: 'cyan',
  },
  {
    icon: '✏️',
    title: 'Full CRUD',
    desc: 'Insert, Edit and Delete with beautiful modals, JSON validation, and instant feedback.',
    accent: 'green',
  },
  {
    icon: '📦',
    title: 'Offline Cache',
    desc: 'Data stays visible when the server is offline. Cached across restarts automatically.',
    accent: 'yellow',
  },
  {
    icon: '🔍',
    title: 'Live Search',
    desc: 'Filter documents across all fields in real-time. No page reload, zero latency.',
    accent: 'red',
  },
  {
    icon: '⚡',
    title: 'npm Install',
    desc: 'One command installs AstraDB with the right binary for your platform automatically.',
    accent: 'purple',
  },
]

// ─── Roadmap ──────────────────────────────────────────────────────────────────
export const ROADMAP = [
  { icon: '🔐', title: 'Auth & User Management',   desc: 'Role-based access, user accounts, API key management.',  status: 'soon' },
  { icon: '📊', title: 'Metrics Dashboard',         desc: 'Real-time charts for query perf, storage, document counts.', status: 'soon' },
  { icon: '🔎', title: 'Advanced Query Builder',    desc: 'Visual filters, sorts, projections, aggregation pipelines.', status: 'beta' },
  { icon: '🗺️', title: 'Schema Explorer',          desc: 'Visualize inferred schemas, field types, data distribution.', status: 'soon' },
  { icon: '☁️', title: 'AstraCloud',                desc: 'Managed cloud hosting — deploy in one click, no server.',     status: 'soon' },
  { icon: '🔄', title: 'Import / Export',           desc: 'Bulk import from JSON/CSV, backup and restore databases.',    status: 'soon' },
  { icon: '🤝', title: 'Team Workspaces',           desc: 'Share connections, collaborate on queries in real-time.',     status: 'planned' },
  { icon: '🔌', title: 'Plugin System',             desc: 'Extend AstraForge with community plugins and themes.',        status: 'planned' },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { name: 'Rahul M.',  role: 'Backend Engineer',  avatar: 'R', rating: 5, text: 'Finally a GUI that doesn\'t feel like it was built in 2010. The offline cache alone is worth it.' },
  { name: 'Priya S.',  role: 'Full Stack Dev',     avatar: 'P', rating: 5, text: 'npm install → astradb start → open AstraForge. Three steps. That\'s genuinely incredible.' },
  { name: 'Karan T.',  role: 'Systems Developer',  avatar: 'K', rating: 5, text: 'The CRUD modals are so clean. JSON validation, inline errors, sample data — everything is thought through.' },
]

// ─── Docs structure ───────────────────────────────────────────────────────────
export const DOCS_SECTIONS = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'features', label: 'Features' },
      { id: 'installation', label: 'Installation' },
      { id: 'quick-start', label: 'Quick Start' },
    ],
  },
  {
    id: 'modes',
    label: 'Modes',
    items: [
      { id: 'embedded-mode', label: 'Embedded Mode' },
      { id: 'server-mode', label: 'Server Mode' },
      { id: 'client-mode', label: 'Client Mode' },
    ],
  },
  {
    id: 'core-api',
    label: 'Core API',
    items: [
      { id: 'db-ops', label: 'Database Operations' },
      { id: 'insert', label: 'Insert Documents' },
      { id: 'query', label: 'Query Documents' },
      { id: 'update', label: 'Update Documents' },
      { id: 'delete', label: 'Delete Documents' },
    ],
  },
  {
    id: 'operators',
    label: 'Operators',
    items: [
      { id: 'query-operators', label: 'Query Operators' },
      { id: 'update-operators', label: 'Update Operators' },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    items: [
      { id: 'schema-validation', label: 'Schema Validation' },
      { id: 'indexing', label: 'Indexing' },
      { id: 'rest-api', label: 'REST API' },
      { id: 'configuration', label: 'Configuration' },
      { id: 'typescript', label: 'TypeScript' },
    ],
  },
  {
    id: 'more',
    label: 'More',
    items: [
      { id: 'performance', label: 'Performance' },
      { id: 'compatibility', label: 'Compatibility' },
      { id: 'comparison', label: 'Comparison' },
      { id: 'use-cases', label: 'Use Cases' },
      { id: 'astraforge', label: 'AstraForge GUI' },
      { id: 'cli', label: 'CLI Commands' },
      { id: 'roadmap', label: 'Roadmap' },
      { id: 'license', label: 'License & Support' },
    ],
  },
]
