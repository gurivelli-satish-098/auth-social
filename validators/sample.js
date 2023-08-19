const { body, query } = require("express-validator");

exports.sampleValidator = [
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("first_name cannot be empty.")
    .isString()
    .withMessage("first_name should be a string on non zero length."),
  body("email").isEmail().withMessage("Must be a valid email address."),
  query("id")
    .not()
    .isEmpty()
    .withMessage("id cannot be empty.")
    .isInt()
    .withMessage("id should be integer."),
];
