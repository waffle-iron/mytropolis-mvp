var Sequelize = require('sequelize');
var password = require('../config/mysql.js');

var db = new Sequelize('scenic', 'root', password);

module.exports = db;
