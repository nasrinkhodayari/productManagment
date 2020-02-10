const express = require("express");
const bodyParser = require("body-parser");
const corsMiddleWare = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(corsMiddleWare(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var config = require('./app/server/config/db.config'),
validator = require('./app/server/controllers/modules/core/validator'),
models = require('./app/server/models'),
authService = require('./app/server/services/authentication.service');
var api = {
  app,
  models,
  validator,
  config
};


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Product management application." });
});

const PORT = process.env.PORT || 8080;


// Routes & middlewares
authService(api);

app.listen(PORT, () => {
  console.log("Server is running on port "+PORT);
});