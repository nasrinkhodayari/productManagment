module.exports = function (api) {
    const productController = require('../controllers/product.controller')(api);
    const productSrvRout = '/services/product';
    //Add New Product
    api.app.post(productSrvRout, function (req, res) {
        productController.addProduct(req, res);
    });
    //Edit Product
    api.app.put(productSrvRout + "/:id", function (req, res) {
        productController.editProduct(req, res);
    });
    //Delete Product(s)
    api.app.delete(productSrvRout, function (req, res) {
        productController.deleteProduct(req, res);
    });
    //Search Product (by Name)
    api.app.get(productSrvRout, function (req, res) {
        productController.searchProduct(req, res);
    });
}