let Bluebird = require('bluebird');

/**
 * Tries to find an user with the given credentials.
 * @param username
 * @param password
 * @returns A Bluebird promise with an user
 */
function findUser(username, password) {
  if(username === 'john' && password === 42) {
    return Bluebird.resolve({
      password: 42,
      username: 'john'
    });
  }
  return Bluebird.reject(new Error('No user found.'));
}

/**
 * Middleware to ensure that an user is authenticated.
 * It will be used to protect some routes.
 * Params are the same as the one for any express middleware.
 * @returns {*}
 */
function ensureAuthenticated(req, res, next) {
  console.log('Trying to authenticate...');
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    error: 'Request not authenticated'
  });
}

module.exports = {
  findUser,
  ensureAuthenticated
}