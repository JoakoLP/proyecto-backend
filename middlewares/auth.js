module.exports = (req, res, next) => {
  if (!req.cookies.userSession) {
    res.status(501).send("You need to login first.");
  } else {
    next();
  }
};
