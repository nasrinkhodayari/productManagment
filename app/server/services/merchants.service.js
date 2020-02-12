module.exports = function (api) {
    const merchantsController = require('../controllers/merchants.controller')(api);
    api.app.get('/services/merchants', function (req, res) {
        merchantsController.getMerchants(req, res);
    });
  }