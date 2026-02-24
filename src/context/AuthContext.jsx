import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const normalizeUser = (u) => {
  if (!u) return null

  const firstName =
    u.firstName ?? u.firstname ?? u.first_name ?? ''

  const lastName =
    u.lastName ?? u.lastname ?? u.last_name ?? ''

  const name =
    u.name ??
    u.fullName ??
    u.username ??
    [firstName, lastName].filter(Boolean).join(' ') ??
    u.email ??
    'User'

  return { ...u, firstName, lastName, name }
}

const extractToken = (data) =>
  data?.token ||
  data?.accessToken ||
  data?.jwt ||
  data?.data?.token ||
  data?.data?.accessToken ||
  data?.data?.jwt

const extractUser = (data) =>
  data?.user ||
  data?.data?.user ||
  data?.profile ||
  data?.data

const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem('af_token')

  const res = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
    ...options,
  })

  // If backend returns empty response sometimes
  const text = await res.text()
  const data = text ? JSON.parse(text) : {}

  if (!res.ok) throw new Error(data.message || 'Something went wrong.')
  return data
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session
  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem('af_token')
      if (!token || token === 'undefined' || token === 'null') {
        localStorage.removeItem('af_token')
        setLoading(false)
        return
      }

      try {
        const data = await apiFetch('/api/auth/me')
        const u = normalizeUser(extractUser(data))
        setUser(u)
      } catch {
        localStorage.removeItem('af_token')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    restore()
  }, [])

  // Google callback
  useEffect(() => {
    if (!window.location.pathname.startsWith('/auth/callback')) return
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (!token) return

    localStorage.setItem('af_token', token)

    apiFetch('/api/auth/me')
      .then((data) => {
        setUser(normalizeUser(extractUser(data)))
        window.history.replaceState({}, '', '/')
      })
      .catch(() => {
        localStorage.removeItem('af_token')
        window.history.replaceState({}, '', '/signin')
      })
  }, [])

  const signUp = useCallback(async (firstName, lastName, email, password) => {
    const data = await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    })

    const token = extractToken(data)
    const u = normalizeUser(extractUser(data))

    if (!token) throw new Error('Signup succeeded but token is missing in API response.')
    localStorage.setItem('af_token', token)
    setUser(u)
    return u
  }, [])

  const signIn = useCallback(async (email, password) => {
    const data = await apiFetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const token = extractToken(data)
    const u = normalizeUser(extractUser(data))

    if (!token) throw new Error('Signin succeeded but token is missing in API response.')
    localStorage.setItem('af_token', token)
    setUser(u)
    return u
  }, [])

  const signInWithGoogle = useCallback(() => {
    window.location.href = `${API}/api/auth/google`
  }, [])

  const signOut = useCallback(async () => {
    try { await apiFetch('/api/auth/signout', { method: 'POST' }) } catch {}
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
