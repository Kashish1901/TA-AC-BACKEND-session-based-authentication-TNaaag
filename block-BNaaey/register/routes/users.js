var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/", function (req, res, next) {
  res.render("user.ejs");
});

router.get("/register", async (req, res, next) => {
  try {
    res.render("register.ejs");
    console.log(session);
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    res.redirect("/users");
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
      res.redirect("/users/login");
    }
    var user = await User.findOne({ email });
    if (!user) {
      res.redirect("/users/login");
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        res.redirect("/users/login");
      }
      req.session.userId = user.id;
      res.redirect("/users");
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
