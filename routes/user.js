const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

const checksUser = require("../middlewares/checksUser");
const { checksValidation } = require("../middlewares/checksValidation");
const auth = require("../middlewares/auth");
const nauth = require("../middlewares/nauth");
const checksChange = require("../middlewares/checksChange");

router.get("/", userController.index);
router.post("/login", nauth, checksUser, checksValidation, userController.login);
router.delete("/logout", auth, userController.logout);
router.post("/register", nauth, checksUser, checksValidation, userController.register);
router.get("/info", auth, userController.info);
router.put("/info/change-name", auth, checksChange.name, checksValidation, userController.changeName);
router.put("/info/change-email", auth, checksChange.email, checksValidation, userController.changeEmail);
router.put("/info/change-password", auth, checksChange.pass, checksValidation, userController.changePass);
router.delete("/info/unregister", auth, userController.unregister);

module.exports = router;
