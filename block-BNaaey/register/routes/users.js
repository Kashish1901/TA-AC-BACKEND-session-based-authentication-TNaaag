var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/", function (req, res, next) {
  res.render("user.ejs");
});

router.get("/register", async (req, res, next) => {
  try {
    res.render("register.ejs");
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    res.redirect("/users/login");
  } catch (err) {
    next(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/login", async (req, res, next) => {
  try {
    var { email, password } = req.body;
    if (!email || !password) {
      return res.redirect("/users/login");
    }
    var user = await User.findOne({ email });
    console.log(req.body, user);
    if (!user) {
      return res.redirect("/users/login");
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        return res.redirect("/users/login");
      }
      console.log("logged user in!");
      req.session.userId = user.id;
      res.redirect("/dashboard");
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
