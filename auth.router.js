let express   = require('express');
let passport  = require('passport');

/**
 * The authentication router, wooohoo.
 * It uses passport.
 * Passport is configured in the file server.js,
 * at the beginning.
 */
const router = express.Router();

/**
 * POST /login
 * Content-Type: application/json
 * {
 *    "username": "john",
 *    "password": 42
 * }
 *
 * Tries to log an user.
 * It basically send a header telling the browser to set a cookie
 * with the session ID upon success.
 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json(new Error('No user'));
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/test');
    });
  })(req, res, next);
});

/**
 * POST /logout
 *
 * Logs an user out and destroy the session.
 * Upon success, sends a header telling the browser
 * to delete the cookie.
 */
router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;