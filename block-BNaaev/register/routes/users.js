var express = require("express");
var router = express.Router();
var User = require("../models/User");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
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
    console.log(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
