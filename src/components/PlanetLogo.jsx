export default function PlanetLogo({ size = 40, glow = true }) {
  const id = Math.random().toString(36).slice(2, 6)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={glow ? { filter: 'drop-shadow(0 0 12px rgba(124,58,237,0.6))' } : {}}
    >
      <defs>
        <radialGradient id={`planet-${id}`} cx="42%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="40%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#2e1065" />
        </radialGradient>
        <radialGradient id={`shine-${id}`} cx="35%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`ring1-${id}`} x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`ring2-${id}`} x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <filter id={`blur-${id}`}>
          <feGaussianBlur stdDeviation="2" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <style>{`
        .r1-${id} { transform-origin: 20px 20px; animation: spinFwd 4s linear infinite; }
        .r2-${id} { transform-origin: 20px 20px; animation: spinRev 6s linear infinite; }
        .r3-${id} { transform-origin: 20px 20px; animation: spinFwd 9s linear infinite; }
        @keyframes spinFwd { to { transform: rotate(360deg); } }
        @keyframes spinRev { to { transform: rotate(-360deg); } }
      `}</style>

      {/* Orbit ring 1 */}
      <g className={`r1-${id}`}>
        <ellipse cx="20" cy="20" rx="17" ry="5.5"
          stroke={`url(#ring1-${id})`} strokeWidth="1.4" fill="none"
          transform="rotate(-30 20 20)" opacity="0.85" />
        <circle cx="37" cy="20" r="1.4" fill="#c4b5fd"
          transform="rotate(-30 20 20)" />
      </g>

      {/* Orbit ring 2 */}
      <g className={`r2-${id}`}>
        <ellipse cx="20" cy="20" rx="15.5" ry="4.8"
          stroke={`url(#ring2-${id})`} strokeWidth="1.1" fill="none"
          transform="rotate(40 20 20)" opacity="0.75" />
        <circle cx="35.5" cy="20" r="1.1" fill="#67e8f9"
          transform="rotate(40 20 20)" />
      </g>

      {/* Orbit ring 3 */}
      <g className={`r3-${id}`}>
        <ellipse cx="20" cy="20" rx="13" ry="3.5"
          stroke={`url(#ring1-${id})`} strokeWidth="0.8" fill="none"
          transform="rotate(75 20 20)" opacity="0.45" />
      </g>

      {/* Planet core */}
      <circle cx="20" cy="20" r="7" fill={`url(#planet-${id})`} filter={`url(#blur-${id})`} />
      <circle cx="20" cy="20" r="7" fill={`url(#shine-${id})`} />

      {/* Stars */}
      <circle cx="5"  cy="7"  r="0.5" fill="#a78bfa" opacity="0.6" />
      <circle cx="34" cy="5"  r="0.5" fill="#67e8f9"  opacity="0.5" />
      <circle cx="33" cy="33" r="0.4" fill="#c084fc"  opacity="0.4" />
      <circle cx="8"  cy="31" r="0.4" fill="#67e8f9"  opacity="0.35" />
    </svg>
  )
}
