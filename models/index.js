'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
require('../config/config')
var db = {};
console.log(CONFIG)
const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
  host: CONFIG.db_host,
  dialect: 'mysql' ,
  port: 3306,
  operatorsAliases: false,
  define: {
    timestamps: false
  },
  dialectOptions: {
    useUTC: true
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
