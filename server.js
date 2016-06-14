var express = require('express');
var passport = require('passport');

var router = require('./server/router/routes');
var port = process.env.PORT || 5000;
var app = express();

// require('./server/db/relationships')();

app.use(passport.initialize());

// This must be declared after the Express session is declared
app.use(passport.session());

router(app, express);

app.listen(port, function(err) {
  if (err) {
    return console.log('Listen error: ', err);
  }
  console.log('Mytropolis listening on Port ' + port);
});
