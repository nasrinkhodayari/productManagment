module.exports = function (api) {
  const authenticationController = require('../controllers/authentication.controller')(api);
  api.app.post('/services/auth/login', function (req, res) {
    authenticationController.login(req, res);
  });
}