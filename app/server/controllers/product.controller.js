module.exports = function (api) {

    const addProduct = (req, res) => {
        //ADD VALIDATION

        // Create a Product
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
                        message: "Cannot update Product with id=${id}. Maybe Product was not found!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Product with id=" + id
                });
            });
    };
    const editProductImages = (images, res) => {
        api.models.product_images.bulkCreate(images,
            {
                updateOnDuplicate: ['image', 'updatedAt']
            }).then(put => {
                res.send({
                    message: "Product Image was updated successfully."
                });
            }).catch(err => {
                res.send({
                    message: "Cannot update Product Image with id=${product_image_id}. Maybe Product Image was not found!"
                });
            })
    };
    const deleteProduct = (req, res) => { };
    const searchProduct = (req, res) => { };

    return {
        addProduct: addProduct,
        editProduct: editProduct,
        deleteProduct: deleteProduct,
        searchProduct: searchProduct
    };
}