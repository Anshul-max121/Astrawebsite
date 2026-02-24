import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const normalizeUser = (u) => {
  if (!u) return null
  const firstName = u.firstName ?? u.firstname ?? u.first_name ?? ''
  const lastName = u.lastName ?? u.lastname ?? u.last_name ?? ''
  const name =
    u.name ??
    u.fullName ??
    u.username ??
    [firstName, lastName].filter(Boolean).join(' ') ||
    u.email ||
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
  data?.data ||
  null

const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem('af_token')

  const res = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && token !== 'undefined' && token !== 'null'
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...(options.headers || {}),
    },
    credentials: 'include', // IMPORTANT for cookie auth
    ...options,
  })

  const text = await res.text()
  const data = text ? JSON.parse(text) : {}

  if (!res.ok) throw new Error(data.message || 'Something went wrong.')
  return data
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ✅ Restore session for BOTH: token auth & cookie auth
  useEffect(() => {
    const restore = async () => {
      try {
        const data = await apiFetch('/api/auth/me')
        setUser(normalizeUser(extractUser(data)))
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    restore()
  }, [])

  const signUp = useCallback(async (firstName, lastName, email, password) => {
    const data = await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    })

    const token = extractToken(data)
    if (token) localStorage.setItem('af_token', token)

    // ✅ user may not be returned; cookie might be set. fallback to /me
    const u = normalizeUser(extractUser(data))
    if (u) {
      setUser(u)
      return u
    }

    const me = await apiFetch('/api/auth/me')
    const meUser = normalizeUser(extractUser(me))
    setUser(meUser)
    return meUser
  }, [])

  const signIn = useCallback(async (email, password) => {
    const data = await apiFetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const token = extractToken(data)
    if (token) localStorage.setItem('af_token', token)

    const u = normalizeUser(extractUser(data))
    if (u) {
      setUser(u)
      return u
    }

    const me = await apiFetch('/api/auth/me')
    const meUser = normalizeUser(extractUser(me))
    setUser(meUser)
    return meUser
  }, [])

  const signOut = useCallback(async () => {
    try {
      await apiFetch('/api/auth/signout', { method: 'POST' })
    } catch {}
    localStorage.removeItem('af_token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
