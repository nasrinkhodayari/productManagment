var fs = require("fs");
var path = require("path");
var Sequelize = require('sequelize');
var dbConfig = require('../config/db.config.js')
var sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, dbConfig);

const db = {};
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;

  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

sequelize.sync();
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;