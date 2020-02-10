let fs = require("fs");
let path = require("path");
let Sequelize = require('sequelize');
let dbConfig = require('../config/db.config.js')
let dbSequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, dbConfig);

const db = {};
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    let model = dbSequelize.import(path.join(__dirname, file));
    db[model.name] = model;

  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

dbSequelize.sync();
db.Sequelize = Sequelize;
db.sequelize = dbSequelize;

module.exports = db;