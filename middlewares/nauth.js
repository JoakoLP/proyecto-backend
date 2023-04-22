module.exports = (req, res, next) => {
  if (req.cookies.userSession) {
    res.status(501).send("Already logged in.");
  } else {
    next();
  }
};
