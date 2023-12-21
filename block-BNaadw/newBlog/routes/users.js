var express = require("express");
var router = express.Router();
var Article = require("../models/Article");
var User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log(req.session);
  res.send("respond with a resource");
});

//router.get("/register", (req, res) => {
// var error = req.flash("error")[0];
// console.log(req.session);
// res.render("register.ejs", { error });
//});
router.get("/register", (req, res) => {
  var error = req.flash("error")[0];
  console.log(error);
  res.render("register.ejs", { error });
});
router.post("/register", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    return res.redirect("/users/login");
  } catch (err) {
    console.log(err.code);
    if (err.code === 11000) {
      req.flash("error", "duplicate Email");
    }
    res.redirect("/users/register");
  }
});

//router.post("/register", async (req, res, next) => {
//try {
// var user = await User.create(req.body);
//return res.redirect("/users/login");
// } catch (err) {
//  if (err) {
//  if (err.name === "MongoError") {
//    req.flash("error", "Email already taken!");
//    return res.redirect("/users/register");
//  }
//   if (err.name === "ValidationError") {
//    req.flash("error", err.message);
//    return res.redirect("/users/register");
//   }
//     //  return next(err);
//  }
//  }
// });

//router.get("/login", (req, res) => {
// res.render("login.ejs");
//});
router.get("/login", (req, res) => {
  var error = req.flash("error")[0];
  res.render("login.ejs", { error });
});

router.post("/login", async (req, res, next) => {
  try {
    var { email, password } = req.body;
    if (!email || !password) {
      req.flash("error", "Email/password required!");
      return res.redirect("/users/login");
    }
    var user = await User.findOne({ email });
    console.log(req.body, user);
    if (!user) {
      req.flash("error", "User not registerd!");
      return res.redirect("/users/login");
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash("error", "Invalid password!");
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
