const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const tokenGenerator = require("../utils/jwt");

class UserController {
  index(req, res) {
    res.status(200).json({
      routes: {
        "./user/": {
          function: "See 'user' index.",
        },
        "./user/login": {
          function: "Login with your account.",
          body: { email: "your@email.com", password: "yourPassword", remember: "boolean, true or false" },
        },
        "./user/logout": {
          function: "Log out from your account.",
        },
        "./user/register": {
          function: "Login with your account.",
          body: { name: "Your name.", email: "your@email.com", password: "yourPassword" },
        },
        "./user/info": "See 'info' index.",
      },
    });
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user == null) {
        res.status(500).json({ msg: "Email not registered in DB." });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(500).json({ msg: "Incorrect password." });
      }
      const token = tokenGenerator({ id: user._id, email: user.email });
      req.session.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      if (req.body.remember) {
        // stays logged 2 hours if 'remember' is true.
        res.cookie("userSession", { ...req.session.user, remember: true }, { maxAge: 3600000 * 2 });
      } else {
        // stays logged 1 minute if 'remember' is false.
        res.cookie("userSession", { ...req.session.user, remember: false }, { maxAge: 60000 });
      }
      res.status(201).json({
        msg: "Logged in!",
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  logout(req, res) {
    res.clearCookie("userSession");
    req.session.destroy();
    res.status(201).json({
      msg: "Session closed.",
    });
  }

  async register(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      try {
        const salt = bcrypt.genSaltSync(8);
        const passwordHash = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: passwordHash,
        });
        await user.save();
        req.session.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        res.cookie("userSession", { ...req.session.user, remember: false }, { maxAge: 60000 });
        res.status(201).json({ msg: "User registered succesfully." });
      } catch (error) {
        res.json(error);
      }
    } else {
      res.status(500).json({ msg: "Email already registered." });
    }
  }

  info(req, res) {
    const user = req.cookies.userSession;
    res.status(200).json({
      "user info": [user.name, user.email],
      routes: {
        "./info": "See 'info' index.",
        "./info/change-name": {
          function: "Change your account name.",
          body: { name: "New name." },
        },
        "./info/change-email": {
          function: "Change your account email.",
          body: { email: "New email." },
        },
        "./info/change-password": {
          function: "Change your account password.",
          body: { password: "New password." },
        },
        "./info/unregister": {
          function: "Delete your account.",
        },
      },
    });
  }

  async changeName(req, res) {
    try {
      const user = req.cookies.userSession;
      await User.findByIdAndUpdate(user._id, { name: req.body.name });
      const newUser = await User.findById(user._id);
      req.session.user = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };
      if (user.remember) {
        res.cookie("userSession", { ...req.session.user, remember: true }, { maxAge: 3600000 * 2 });
      } else {
        res.cookie("userSession", { ...req.session.user, remember: false }, { maxAge: 60000 });
      }
      res.status(201).json({ msg: "Name changed.", newUser });
    } catch (error) {
      res.json(error);
    }
  }

  async changeEmail(req, res) {
    try {
      const user = req.cookies.userSession;
      await User.findByIdAndUpdate(user._id, { email: req.body.email });
      const newUser = await User.findById(user._id);
      req.session.user = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };
      if (user.remember) {
        res.cookie("userSession", { ...req.session.user, remember: true }, { maxAge: 3600000 * 2 });
      } else {
        res.cookie("userSession", { ...req.session.user, remember: false }, { maxAge: 60000 });
      }
      res.status(201).json({ msg: "Email changed.", newUser });
    } catch (error) {
      res.json(error);
    }
  }

  async changePass(req, res) {
    try {
      const user = req.cookies.userSession;
      const salt = bcrypt.genSaltSync(8);
      const passwordHash = bcrypt.hashSync(req.body.password, salt);
      await User.findByIdAndUpdate(user._id, { password: passwordHash });
      const newUser = await User.findById(user._id);
      req.session.user = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      };
      if (user.remember) {
        res.cookie("userSession", { ...req.session.user, remember: true }, { maxAge: 3600000 * 2 });
      } else {
        res.cookie("userSession", { ...req.session.user, remember: false }, { maxAge: 60000 });
      }
      res.status(201).json({ msg: "Password changed.", newUser });
    } catch (error) {
      res.json(error);
    }
  }

  async unregister(req, res) {
    try {
      const user = req.cookies.userSession;
      await User.findByIdAndDelete(user._id);
      res.clearCookie("userSession");
      req.session.destroy();
      res.status(201).json({ msg: "User deleted." });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new UserController();
