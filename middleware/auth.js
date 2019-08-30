const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, 'this-is-private-key');
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
