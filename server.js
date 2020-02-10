const express = require("express");
const bearerToken = require('express-bearer-token');
const bodyParser = require("body-parser");
// const corsMiddleWare = require("cors");
const app = express();

// const corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(bearerToken());
// app.use(corsMiddleWare(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const config = require('./app/server/config/db.config'),
  validator = require('./app/server/controllers/modules/core/validator'),
  models = require('./app/server/models'),
  authService = require('./app/server/services/authentication.service'),
  productService = require('./app/server/services/product.service'),
  tokenConfig = require('./app/server/config/token.config');
const api = {
  app,
  models,
  validator,
  config,
  tokenConfig
};


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Product management application." });
});

const PORT = process.env.PORT || 8080;


// Routes & middlewares
authService(api);
productService(api);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});