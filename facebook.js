var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  config = require('./configuration/config');

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret: config.facebook_api_secret,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      //Check whether the User exists or not using profile.id
      //Further DB code.
      return done(null, profile);
    });
  }
));

function initFacebook(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/facebook/me', function(req, res) {

  });

  //Passport Router
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/facebook/me',
      failureRedirect: '/error'
    }),
    function(req, res) {
      res.redirect('/facebook/me');
    });

  app.get('auth/facebook/logout', function(req, res) {
    req.logout();
    res.send('Logged out');
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  }
}

module.exports = {
  init: initFacebook
};
