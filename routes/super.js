const express = require("express");
const router = express.Router();
const superController = require("../controller/superController");

const auth = require("../middlewares/auth");

router.get("/", superController.index);
router.get("/search/:hero", superController.search);
router.get("/search-id/:id", superController.searchId); // give hero's id
router.get("/search-id-power/:id", superController.searchIdPower); // give hero powerstats
router.get("/search-id-bio/:id", superController.searchIdBio); // give hero biography
router.get("/search-id-image/:id", superController.searchIdImg); // give hero image

router.get("/bookmarks", auth, superController.heroBookmark); // list account bookmarks
router.put("/add-to-bookmarks/:id", auth, superController.heroBookmarkAdd); // adds a hero to account bookmarks
router.put("/delete-from-bookmarks/:id", auth, superController.heroBookmarkDlt); // deletes a hero to account bookmarks

module.exports = router;
