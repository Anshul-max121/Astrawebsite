const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { protect } = require('../middleware/auth')

// ─── Helper: sign a JWT and return it ────────────────────────────────────────
const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

// ─── Helper: send token + user in response ───────────────────────────────────
const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = signToken(user._id)

  // Also set as httpOnly cookie (nice to have — frontend can use either)
  res.cookie('af_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  })

  res.status(statusCode).json({
    success: true,
    token,
    user: user.toJSON(),
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/signup
// ─────────────────────────────────────────────────────────────────────────────
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    // Validation
    if (!firstName || !email || !password) {
      return res.status(400).json({ success: false, message: 'First name, email and password are required.' })
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' })
    }

    // Check for duplicate email
    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' })
    }

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: (lastName || '').trim(),
      email: email.toLowerCase().trim(),
      password,
      avatar: firstName[0].toUpperCase(),
    })

    sendAuthResponse(res, user, 201)
  } catch (err) {
    console.error('[signup]', err)
    // Mongoose duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already registered.' })
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again.' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/signin
// ─────────────────────────────────────────────────────────────────────────────
router.post('/signin', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      return res.status(401).json({ success: false, message: info?.message || 'Invalid credentials.' })
    }
    sendAuthResponse(res, user)
  })(req, res, next)
})

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/auth/google  →  Redirect to Google consent screen
// ─────────────────────────────────────────────────────────────────────────────
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: true, // we need a brief session just for the OAuth redirect
  })
)

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/auth/google/callback  →  Google redirects back here
// ─────────────────────────────────────────────────────────────────────────────
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: true,
    failureRedirect: `${process.env.CLIENT_URL}/signin?error=google_failed`,
  }),
  (req, res) => {
    // Issue JWT, then redirect to frontend with token in query param
    // The frontend reads it once and stores it, then clears the URL
    const token = signToken(req.user._id)

    // Set cookie too
    res.cookie('af_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    // Redirect to frontend — token in URL is only for handoff
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`)
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/auth/me  →  Get currently logged-in user (JWT required)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/me', protect, (req, res) => {
  res.json({ success: true, user: req.user.toJSON() })
})

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/signout
// ─────────────────────────────────────────────────────────────────────────────
router.post('/signout', protect, (req, res) => {
  res.clearCookie('af_token')
  res.json({ success: true, message: 'Signed out successfully.' })
})

module.exports = router