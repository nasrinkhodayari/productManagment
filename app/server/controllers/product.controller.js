module.exports = function (api) {

    const addProduct = (req, res) => {
        // Validator posted data
        let validator = new api.validator();
        validator
            .add({
                type: 'require',
                value: req.body.title,
                msg: 'Product title is not valid'
            })
            .add({
                type: 'require',
                value: req.body.url,
                msg: 'Product url is not valid'
            }).add({
                type: 'require',
                value: req.body.price,
                msg: 'Product price is not valid'
            }).add({
                type: 'require',
                value: req.body.merchant_id,
                msg: 'Product merchant is not valid'
            }).add({
                type: 'require',
                value: req.body.category_id,
                msg: 'Product category is not valid'
            }).add({
                type: 'array',
                value: req.body.images,
                msg: 'Please insert images(s) url for your product'
            })
            .validate()
            .error(msgs => {
                res.status(500).send({
                    message: msgs
                });
            }).success(() => {
                // Create a Product
                const product = {
                    title: req.body.title,
                    url: req.body.url,
                    price: req.body.price,
                    msrp: req.body.msrp,
                    available: req.body.available,
                    description: req.body.description,
                    merchant_id: req.body.merchant_id,
                    category_id: req.body.category_id,
                    default_image: req.body.default_image
                };
                api.models.product.create(product).then(data => {
                    if (data.product_id) {
                        addImagesToProduct(data.product_id, req.body.images, res);
                    } else {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Product."
                        });
                    }
                }).catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Product."
                    });
                });
            });
    };
    const addImagesToProduct = (productId, images, res) => {

        // Create a Product Image(s)
        let imagesUrls = [];
        images.forEach(img => {
            imagesUrls.push({ image: img, product_id: productId })
        });
        api.models.product_images.bulkCreate(imagesUrls).then(data => {
            res.send(images);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product Image(s)."
            });
        });
    };
    const editProduct = (req, res) => {
        let id = req.params.id;
        // Validator posted data
        let validator = new api.validator();
        validator
            .add({
                type: 'require',
                value: req.body.title,
                msg: 'Product title is not valid'
            })
            .add({
                type: 'require',
                value: req.body.url,
                msg: 'Product url is not valid'
            }).add({
                type: 'require',
                value: req.body.price,
                msg: 'Product price is not valid'
            }).add({
                type: 'require',
                value: req.body.merchant_id,
                msg: 'Product merchant is not valid'
            }).add({
                type: 'require',
                value: req.body.category_id,
                msg: 'Product category is not valid'
            }).add({
                type: 'array',
                value: req.body.images,
                msg: 'Please insert images(s) url for your product'
            })
            .validate()
            .error(msgs => {
                res.status(500).send({
                    message: msgs
                });
            }).success(() => {
                // Edit a Product
                const product = {
                    title: req.body.title,
                    url: req.body.url,
                    price: req.body.price,
                    msrp: req.body.msrp,
                    available: req.body.available,
                    description: req.body.description,
                    merchant_id: req.body.merchant_id,
                    category_id: req.body.category_id
                };

                api.models.product.update(product, {
                    where: { product_id: id }
                })
                    .then(put => {
                        if (put[0] === 1) {
                            if (req.body.images) {
                                editProductImages(req.body.images, res);
                            } else {
                                res.send({
                                    message: "Product was updated successfully."
                                });
                            }
                        } else {
                            res.send({
                                message: "Cannot update Product. Maybe Product was not found!"
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Product!",
                            detail: err.table
                        });
                    });
            });
    };
    const editProductImages = (images, res) => {
        api.models.product_images.bulkCreate(images,
            {
                updateOnDuplicate: ['image', 'updatedAt']
            }).then(put => {
                res.send({
                    message: "Product was updated successfully."
                });
            }).catch(err => {
                res.send({
                    message: "Cannot update Product Image. Maybe Product Image was not found!"
                });
            })
    };
    const deleteProduct = (req, res) => {

        api.models.product.destroy({ where: { product_id: req.params.ids } })
            .then(num => {
                if (num === 0) {
                    res.status(404).send({
                        message: "Product(s) not found!"
                    });
                } else {
                    res.send({
                        message: "Product(s) was deleted successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Product "
                });
            });
    };
    const searchProduct = (req, res) => {

        let sql_query = "SELECT products.*,categories.title as categoryName FROM products LEFT JOIN categories on products.category_id=";
        sql_query += "categories.category_id where products.title like :search_name";

        api.models.sequelize
            .query(sql_query, {
                raw: true,
                replacements: { search_name: `%${req.params.title}%` }
            }).spread(results => {
                if (results.length === 0) {
                    res.status(404).send({
                        message: "Product(s) not found"
                    });
                } else {
                    res.send({ body: results });
                }
            });
    };
    const getAllProduct = (req, res) => {

        let sql_query = "SELECT products.*,categories.title as categoryName FROM products LEFT JOIN categories on products.category_id=categories.category_id";

        api.models.sequelize
            .query(sql_query, {
                raw: true,
            }).spread(results => {
                if (results.length === 0) {
                    res.status(404).send({
                        message: "Product(s) not found"
                    });
                } else {
                    res.send({ body: results });
                }
            });
    };
    //get product with image(s),merchantName,categorName
    const getProductById = (req, res) => {
        let sql_query = 'select products.title as productName,';
        sql_query += 'products.url as productUrl, products.price,';
        sql_query += 'products.msrp, products.available, products.description,';
        sql_query += 'merchants.name as merchantName,';
        sql_query += 'categories.title as categoryName from products Left join merchants on merchants.merchant_id=';
        sql_query += 'products.merchant_id left join categories on categories.category_id = products.category_id where products.product_id=' + req.params.id;

        api.models.sequelize
            .query(sql_query, {
                raw: true
            }).spread(results => {
                if (results.length === 0) {
                    res.status(404).send({
                        message: "Product not found"
                    });
                } else {
                    api.models.product_images
                        .findAll({ where: { product_id: req.params.id } })
                        .then(data => {
                            let productImgs = [];
                            data.forEach(img => {
                                productImgs.push({ image: img.image, product_id: img.product_id });
                            });
                            res.send({ body: results, images: productImgs });
                        }).catch(err => {
                            res.status(404).send({
                                message: "Product Image(s) not found"
                            });
                        });
                }
            });
    };
    return {
        addProduct: addProduct,
        editProduct: editProduct,
        deleteProduct: deleteProduct,
        searchProduct: searchProduct,
        getAllProduct: getAllProduct,
        getProductById: getProductById
    };
}