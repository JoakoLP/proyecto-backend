const { check } = require("express-validator");

const checksUser = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Must be a valid email address."),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required.")
    .isString()
    .withMessage("Password must be a string."),
];

module.exports = checksUser;
