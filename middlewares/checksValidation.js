const { validationResult } = require("express-validator");
const checksValidation = async (req, res, next) => {
  try {
    const err = validationResult(req);
    if (err.isEmpty()) {
      next();
    } else {
      res.status(501).json(err);
    }
  } catch (error) {
    res.status(501).json(error);
  }
};

module.exports = { checksValidation };
