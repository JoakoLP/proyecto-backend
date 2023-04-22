const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = tokenGenerator = (body) => {
  const payload = { body };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};
