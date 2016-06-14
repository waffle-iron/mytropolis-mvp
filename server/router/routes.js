var path = require('path');
var authFacebook = require('./../auth/fb');

module.exports = function(app, express) {
  var redirectHome = function(req, res) {
    res.redirect('/survey')
  };

  app.use(express.static(__dirname + '/../../client'));

  app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../client/login.html'));
  });

  app.get('/auth/facebook', authFacebook.handleLogin);

  app.get('/auth/facebook/callback', authFacebook.authenticateLogin, redirectHome);

  app.get('/auth/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/');
    });
  });
};