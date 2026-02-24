import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ─── Small fetch helper ───────────────────────────────────────────────────────
const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem('af_token')

  const res = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include', // send cookies too
    ...options,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong.')
  return data
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // ── On mount: restore session from stored JWT ──────────────────────────────
  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem('af_token')
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const { user } = await apiFetch('/api/auth/me')
        setUser(user)
      } catch {
        // Token expired or invalid — clear it
        localStorage.removeItem('af_token')
      } finally {
        setLoading(false)
      }
    }
    restore()
  }, [])

  // ── Handle Google OAuth callback token in URL ──────────────────────────────
  // After Google redirects to /auth/callback?token=xxx, this effect fires,
  // stores the token, fetches the user, then cleans the URL.
  useEffect(() => {
    if (!window.location.pathname.startsWith('/auth/callback')) return

    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (!token) return

    localStorage.setItem('af_token', token)

    apiFetch('/api/auth/me')
      .then(({ user }) => {
        setUser(user)
        // Clean the token out of the URL, redirect to home
        window.history.replaceState({}, '', '/')
      })
      .catch(() => {
        localStorage.removeItem('af_token')
        window.history.replaceState({}, '', '/signin')
      })
  }, [])

  // ── Sign Up ────────────────────────────────────────────────────────────────
  const signUp = useCallback(async (firstName, lastName, email, password) => {
    const { token, user } = await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    })
    localStorage.setItem('af_token', token)
    setUser(user)
    return user
  }, [])

  // ── Sign In (email + password) ─────────────────────────────────────────────
  const signIn = useCallback(async (email, password) => {
    const { token, user } = await apiFetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    localStorage.setItem('af_token', token)
    setUser(user)
    return user
  }, [])

  // ── Google OAuth ───────────────────────────────────────────────────────────
  // Simply redirect the browser to the backend Google OAuth route.
  // After Google auth, the backend redirects back to /auth/callback?token=xxx
  const signInWithGoogle = useCallback(() => {
    window.location.href = `${API}/api/auth/google`
  }, [])

  // ── Sign Out ───────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    try {
      await apiFetch('/api/auth/signout', { method: 'POST' })
    } catch {
      // If signout API fails, still clear local state
    }
    localStorage.removeItem('af_token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
