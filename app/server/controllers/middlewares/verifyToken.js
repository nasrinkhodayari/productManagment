let jwt = require('jsonwebtoken');
let tokenConfig = require('../../config/token.config');
const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, tokenConfig.secret, function (err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}
module.exports = verifyToken;