module.exports = function (api) {

    const getMerchants = (req, res) => {
        api.models.merchant.findAll().then(list => {
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
                message: "Error retrieving the merchants list"
            });
        });
    };
    return {
        getMerchants: getMerchants
    };
}
