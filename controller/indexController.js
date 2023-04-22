module.exports = index = (req, res) => {
  res.status(200).json({
    routes: {
      "./": "Index.",
      "./user": "User index.",
      "./super": "Superhero index.",
    },
  });
};
