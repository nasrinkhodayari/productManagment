module.exports = function (api) {

  const login = (req, res) => {

    // Validator posted data
    var validator = new api.validator();
    validator
      .add({
        type: 'require',
        value: req.body.username,
        msg: 'Username is not valid'
      })
      .add({
        type: 'require',
        value: req.body.password,
        msg: 'password is not valid'
      })
      .validate()
      .error(function (msgs) {
        res.status(500).send({
          message: msgs
        });
      }).success(function () {
        api.models.users.findOne({ username: req.body.username }
        ).then(user => {
          if (user) {
            let passwordIsValid = api.bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: "username or password is invalid" });

            let token = api.jwt.sign({ id: user.id }, api.tokenConfig.secret, {
              expiresIn: 3600 // expires in 1 hour
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
        });

      });
  };
  const register = (req, res) => {

    // Validator posted data
    var validator = new api.validator();
    validator
      .add({
        type: 'require',
        value: req.body.username,
        msg: 'Username is not valid'
      })
      .add({
        type: 'require',
        value: req.body.firstname,
        msg: 'FirstName is not valid'
      })
      .add({
        type: 'require',
        value: req.body.lastname,
        msg: 'LastName is not valid'
      })
      .add({
        type: 'require',
        value: req.body.password,
        msg: 'password is not valid'
      })
      .validate()
      .error(function (msgs) {
        res.status(500).send({
          message: msgs
        });
      }).success(function () {
        api.models.users.create({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: api.bcrypt.hashSync(req.body.password, 8)
        }).then(user => {
          // create a token
          let token = api.jwt.sign({ id: user.id }, api.tokenConfig.secret, {
            expiresIn: 3600 // expires in 1 hour
          });
          res.status(200).send({ auth: true, token: token });
        }).catch(err => {
          if (err) return res.status(500).send("There was a problem registering the user.")
        });
      });
  };
  return {
    login: login,
    register: register
  };
}
