router.get("/register", async (req, res, next) => {
  try {
    var error = req.flash("error")[0];
    res.render("register.ejs", { error });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    if (user.password.length < 4) {
      req.flash("error", "Password should have min 4 charcters");
      res.redirect("/users/register");
    } else {
      res.redirect("/users/login");
    }
  } catch (err) {
    next(err);
  }
});

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
