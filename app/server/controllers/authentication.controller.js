  module.exports = function (api) {

    const sha1 = require('sha1');
    const login = (req, res) => {
      if (!req.body.username || !req.body.password) {
        //error
        res.status(500).send({
          message: "Enter the correct value of username and password"
        });
      }
      api.models.users.findOne({
        where: {
          username: req.body.username,
          password: sha1(req.body.password)
        }
      }).then(user => {
        if (user) {
          res.status(200).send({
            body: {
              firstName: user.firstname,
              lastName: user.lastname
            },
            message: "welcome to your Product Managment profile"
          });
          res.send(responseObj);
        } else {
          res.status(404).send({
            message: "username or password is invalid"
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: "Error retrieving the user"
        });
      })
    };
    return { login: login };
  }
  