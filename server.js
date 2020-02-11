const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/app/static'));        // Static files

const config = require('./app/server/config/db.config'),
  validator = require('./app/server/controllers/modules/core/validator'),
  models = require('./app/server/models'),
  authService = require('./app/server/services/authentication.service'),
  productService = require('./app/server/services/product.service'),
  tokenConfig = require('./app/server/config/token.config'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  verifyTokenMiddleware = require('./app/server/controllers/middlewares/verifyToken');
const api = {
  app,
  models,
  validator,
  config,
  tokenConfig,
  jwt,
  bcrypt,
  verifyTokenMiddleware
};


// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Product management application." });
// });

const PORT = process.env.PORT || 8080;


// Routes & middlewares
authService(api);
productService(api);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});