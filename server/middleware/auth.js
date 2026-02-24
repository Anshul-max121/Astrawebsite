const jwt = require('jsonwebtoken')
const User = require('../models/User')

// ─── Verify JWT and attach user to req ───────────────────────────────────────
const protect = async (req, res, next) => {
  let token

  // Accept token from Authorization header OR httpOnly cookie
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies?.af_token) {
    token = req.cookies.af_token
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated. Please sign in.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json({ success: false, message: 'User no longer exists.' })

    // Update last login timestamp
    user.lastLoginAt = Date.now()
    await user.save({ validateBeforeSave: false })

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token. Please sign in again.' })
  }
}

module.exports = { protect }