module.exports = function (api) {
  const authenticationController = require('../controllers/authentication.controller')(api);
  api.app.post('/services/auth/login', function (req, res) {
    authenticationController.login(req, res);
  });
  api.app.post('/services/auth/register', function (req, res) {
    authenticationController.register(req, res);
  });
  api.app.get('/services/auth/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
  });
}