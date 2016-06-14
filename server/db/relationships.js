module.exports = function() {
  var db = require('./db.js');
  // var User = require('./../users/userModel.js');

  db.sync();

  // User.belongsToMany(Place, {through: 'UserPlace'});
  
};
