/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#05050a',
          1: '#08080f',
          2: '#0c0c14',
          3: '#101018',
        },
        violet: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          dark: '#4c1d95',
          glow: 'rgba(124,58,237,0.4)',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          light: '#67e8f9',
        },
        text: {
          DEFAULT: '#f4f0ff',
          2: '#a1a1aa',
          3: '#52525b',
          4: '#3f3f46',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        syne: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-slow-r': 'spin 6s linear infinite reverse',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
