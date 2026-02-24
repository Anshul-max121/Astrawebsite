import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PlanetLogo from '@/components/PlanetLogo'

// This page lives at /auth/callback
// The backend redirects here after Google OAuth with ?token=xxx
// AuthContext's useEffect picks up the token automatically.
// This component just shows a loading spinner while that happens.
export default function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check for error param (e.g. user denied Google consent)
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')
    if (error) {
      navigate('/signin?error=' + error)
      return
    }

    // AuthContext handles the token — we just wait a moment then redirect
    const timer = setTimeout(() => navigate('/'), 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      >
        <PlanetLogo size={52} glow />
      </motion.div>

      <div className="text-center">
        <p className="font-syne text-[16px] font-bold text-slate-900">Signing you in…</p>
        <p className="font-mono text-[12px] text-slate-500 mt-1">Connecting with Google</p>
      </div>
    </div>
  )
}