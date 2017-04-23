let express     = require('express');
let passport    = require('passport');
let localStrat  = require('passport-local').Strategy;
let bodyparser  = require('body-parser');
let session     = require('express-session');
let morgan      = require('morgan');

/**
 * Config passport.
 */
// Serialize user
passport.serializeUser(function(user, done) {
  done(null, user);
});
// Deserialize user
passport.deserializeUser(function(user, done) {
  done(null, user);
});
// Use a local strategy
// We use a service which tries to find an user with the given credentials
passport.use(new localStrat((username, password, done) => {
  require('./service')              // The service
    .findUser(username, password)   // It sends back a Bluebird promise with an user if it found one...
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {               // ... or throws an error otherwise
      return done(null, false, {message: err});
    });
}));

/**
 * Config server.
 */
const app = express();

// Set env
app.set('port', 3000);
// Init session
app.use(session({
  secret: 'my-very-secret string',  // To encode cookies
  resave: false,                    // Do not resave sessions everytimes
  saveUninitialized: true           // Save fisrt sessions
}));
// Parse body as json or url encoded (POST/PUT/etc requests)
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
// Use passport middleware (authentication)
app.use(passport.initialize());
app.use(passport.session());

// Log some shits
app.use(morgan('dev'));         // All requests
app.use((req, res, next) => {   // Sessions for each request
  console.log('Session is: ');
  console.log(req.session);
  next();
});

// Default route
app.get('/', (req, res) => {
  return res.status(200).send('hello');
});
// Mount sub routers
app.use('/auth', require('./auth.router'));                                   // Authentication
app.use('/', require('./service').ensureAuthenticated, require('./router'));  // Protected router

/**
 * Start server.
 */
app.listen(app.get('port'), () => {
  console.log('Server running on port ' + app.get('port'));
});