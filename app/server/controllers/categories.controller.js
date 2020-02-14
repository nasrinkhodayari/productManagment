module.exports = function (api) {

    const getCategories = (req, res) => {
        api.models.categories.findAll().then(list => {
            if (list) {
                res.status(200).send({
                    body: list
                });
            } else {
                res.status(404).send({
                    message: "table is empty!"
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving the categories list"
            });
        });
    };
    return {
        getCategories: getCategories
    };
}
