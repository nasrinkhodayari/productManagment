module.exports = function (api) {
    const categoriesController = require('../controllers/categories.controller')(api);
    api.app.get('/services/categories', function (req, res) {
        categoriesController.getCategories(req, res);
    });
  }