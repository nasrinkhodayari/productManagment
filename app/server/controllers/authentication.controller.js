module.exports = function (api) {

  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcryptjs');

  const login = (req, res) => {
    if (!req.body.username || !req.body.password) {
      //error
      res.status(500).send({
        message: "Enter the correct value of username and password"
      });
    }
    api.models.users.findOne({ username: req.body.username }
    ).then(user => {
      if (user) {
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: "username or password is invalid" });

        let token = jwt.sign({ id: user.id }, api.tokenConfig.secret, {
          expiresIn: 3600 // expires in 1 hours
        });

        res.status(200).send({
          auth: true, token: token,
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

  const register = (req, res) => {
    api.models.users.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password:  bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
      // create a token
      let token = jwt.sign({ id: user.id }, api.tokenConfig.secret, {
        expiresIn: 3600 // expires in 1 hours
      });
      res.status(200).send({ auth: true, token: token });
    }).catch(err => {
      if (err) return res.status(500).send("There was a problem registering the user.")
    });
  };
  return {
    login: login,
    register: register
  };
}
