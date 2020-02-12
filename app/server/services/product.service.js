module.exports = function (api) {
    const productController = require('../controllers/product.controller')(api);
    const productSrvRout = '/services/product';
    //Add New Product
    api.app.post(productSrvRout, api.verifyTokenMiddleware, function (req, res) {
        productController.addProduct(req, res);
    });
    //Edit Product
    api.app.put(productSrvRout + "/:id", api.verifyTokenMiddleware, function (req, res) {
        productController.editProduct(req, res);
    });
    //Delete Product(s)
    api.app.delete(productSrvRout, api.verifyTokenMiddleware, function (req, res) {
        productController.deleteProduct(req, res);
    });
    //Search Product (by Name)
    api.app.get(productSrvRout + "/:title", api.verifyTokenMiddleware, function (req, res) {
        productController.searchProduct(req, res);
    });
    //GetAll Product
    api.app.get(productSrvRout, api.verifyTokenMiddleware, function (req, res) {
        productController.getAllProduct(req, res);
    });
    //Get Product by id
    api.app.get(productSrvRout+"/getById/:id", api.verifyTokenMiddleware, function (req, res) {
        productController.getProductById(req, res);
    });
}
