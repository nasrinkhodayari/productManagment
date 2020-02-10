module.exports = function (api) {
  var authenticationController = require('../controllers/authentication.controller')(api);
  api.app.post('/services/auth/login', function (req, res) {
    authenticationController.login(req, res);
  });
}