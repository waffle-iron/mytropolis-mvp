var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var keys = require('./../config/fb');

var clientID = process.env.FB_CLIENT_ID || keys.clientID;
var clientSecret = process.env.FB_CLIENT_ID || keys.clientSecret;

// var User = require('./../db/users/userModel');

// Middleware for checking whether the user is logged in
module.exports.checkAuth = function (req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    next();
  } else {
    req.session.error = 'Bad credentials.';
    res.redirect('/');
  }
};

module.exports.handleLogin = passport.authenticate('facebook', {
  authType: 'rerequest',
  scope: ['public_profile', 'email'] 
});

module.exports.authenticateLogin = passport.authenticate('facebook', {
  failureRedirect: '/'
});

// Determines what user data should be stored in the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Determines what user data should be retrieved from the session
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy.Strategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'link', 'email', 'first_name', 'last_name', 'picture', 'gender', 'verified', 'locale'],
}, 
  function(accessToken, refreshToken, profile, done) {
  // Create a user if it is a new user, otherwise just get the user from the DB
    // User
    //   .findOrCreate({
    //     where: {
    //       facebookUserId: profile.id
    //     },
    //     defaults: {
    //       firstName: profile.name.givenName,
    //       lastName: profile.name.familyName
    //     }
    //   })
    //   .spread(function(user, created) {
    //     console.log('User data returned from User.findOrCreate: ', user.get({
    //       plain: true
    //     }));
    //     console.log('New User Created? (t/f): ', created);
    //   });

    return done(null, profile);
  }));

