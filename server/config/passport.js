const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// ─── Local Strategy (email + password) ───────────────────────────────────────
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
      if (!user) return done(null, false, { message: 'No account found with that email.' })
      if (!user.password) return done(null, false, { message: 'This account uses Google sign-in. Please sign in with Google.' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' })

      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

// ─── Google OAuth Strategy ────────────────────────────────────────────────────
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase()
        if (!email) return done(new Error('No email returned from Google.'))

        // 1. Already linked this Google account
        let user = await User.findOne({ googleId: profile.id })
        if (user) {
          // Keep avatar in sync with Google
          user.avatar = profile.photos?.[0]?.value ?? user.avatar
          await user.save()
          return done(null, user)
        }

        // 2. Email exists but signed up with password — link accounts
        user = await User.findOne({ email })
        if (user) {
          user.googleId = profile.id
          user.avatar = profile.photos?.[0]?.value ?? user.avatar
          await user.save()
          return done(null, user)
        }

        // 3. Brand new user — create account
        const nameParts = profile.displayName?.split(' ') ?? ['User']
        user = await User.create({
          googleId: profile.id,
          email,
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' ') || '',
          avatar: profile.photos?.[0]?.value ?? '',
          isVerified: true, // Google already verified the email
        })
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

// ─── Session serialization (only used during the OAuth redirect dance) ────────
passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})