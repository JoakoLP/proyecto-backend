const axios = require("axios");
const { User } = require("../models/user");

class SuperController {
  index(req, res) {
    res.status(200).json({
      "Superhero ID List": "https://superheroapi.com/ids.html",
      routes: {
        "./super/search/": { function: "Search a superhero.", params: "./super/search/name with superhero's 'name'" },
        "./super/search-id/": { function: "Search a superhero.", params: "./super/search-id/id with superhero's 'id'" },
        "./super/search-id-power/": { function: "Search a superhero's power.", params: "./super/search-id-power/id with superhero's 'id'" },
        "./super/search-id-bio/": { function: "Search a superhero's biography.", params: "./super/search-id-bio/id with superhero's 'id'" },
        "./super/search-id-image/": { function: "Search a superhero's image.", params: "./super/search-id-image/id with superhero's 'id'" },
        "./super/bookmarks/": { function: "List your bookmarks.", params: "./super/bookmarks" },
        "./super/add-to-bookmarks/": { function: "Adds a hero to your bookmarks.", params: "./super/add-to-bookmarks/id with superhero's 'id'" },
        "./super/delete-from-bookmarks/": { function: "Removes a hero from your bookmarks.", params: "./super/delete-from-bookmarks/id with superhero's 'id'" },
      },
    });
  }

  async search(req, res) {
    try {
      const { data, status } = await axios.get(`https://superheroapi.com/api/6104624969614414/search/${req.params.hero}`);
      res.json({ data, status });
    } catch (error) {
      res.json({ data: error.response.data, status: error.response.status });
    }
  }

  async searchId(req, res) {
    try {
      const { data, status } = await axios.get(`https://superheroapi.com/api/6104624969614414/${req.params.id}`);
      res.json({ data, status });
    } catch (error) {
      res.json({ data: error.response.data, status: error.response.status });
    }
  }

  async searchIdPower(req, res) {
    try {
      const { data, status } = await axios.get(`https://superheroapi.com/api/6104624969614414/${req.params.id}/powerstats`);

      res.json({ data, status });
    } catch (error) {
      res.json({ data: error.response.data, status: error.response.status });
    }
  }

  async searchIdBio(req, res) {
    try {
      const { data, status } = await axios.get(`https://superheroapi.com/api/6104624969614414/${req.params.id}/biography`);
      res.json({ data, status });
    } catch (error) {
      res.json({ data: error.response.data, status: error.response.status });
    }
  }

  async searchIdImg(req, res) {
    try {
      const { data, status } = await axios.get(`https://superheroapi.com/api/6104624969614414/${req.params.id}/image`);
      res.json({ data, status });
    } catch (error) {
      res.json({ data: error.response.data, status: error.response.status });
    }
  }

  async heroBookmark(req, res) {
    try {
      const user = req.cookies.userSession;
      const activeUser = await User.findById(user._id);
      const userArray = activeUser.bookmark;
      const name = `${activeUser.name}'s bookmarks`;
      const jsonObj = {};
      jsonObj[name] = userArray;
      res.status(200).json(jsonObj);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async heroBookmarkAdd(req, res) {
    try {
      const user = req.cookies.userSession;
      const activeUser = await User.findById(user._id);
      const userArray = activeUser.bookmark;
      const newArray = userArray.filter((hero) => (hero.id = req.params.id));
      if (newArray.length > 0) {
        res.status(500).send("The hero is already in your bookmarks.");
      } else {
        const { data, status } = await axios.get(`https://superheroapi.com/api/6104624969614414/${req.params.id}/biography`);
        const heroId = { id: data.id, name: data.name, fullName: data["full-name"] };
        await User.findByIdAndUpdate(user._id, { $push: { bookmark: heroId } });
        const newUser = await User.findById(user._id);
        res.status(201).json(newUser);
      }
    } catch (error) {
      res.json(error);
    }
  }

  async heroBookmarkDlt(req, res) {
    const user = req.cookies.userSession;
    // await User.findByIdAndUpdate(user._id, { $filter: { bookmark: [heroId] } });
    const activeUser = await User.findById(user._id);
    const userArray = activeUser.bookmark;
    if (userArray < 1) {
      res.status(500).send("No hero was found.");
    } else {
      const newArray = userArray.filter((hero) => hero.id != req.params.id);
      await User.findByIdAndUpdate(user._id, { bookmark: newArray });
      const newUser = await User.findById(user._id);
      res.status(201).json(newUser);
    }
  }
}

module.exports = new SuperController();
