const jwt = require("jsonwebtoken");

const config = process.env;

exports.verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log(decoded,"=====?")
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

exports.middleware = (req, res, next) => {
  console.log(req, 'inside middleware')
  return next();
}

// module.exports = verifyToken;
// module.exports = middleware;
