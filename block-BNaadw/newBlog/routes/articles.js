var express = require("express");
var router = express.Router();
var Article = require("../models/Article");

router.get("/", async (req, res, next) => {
  try {
    var articles = await Article.find({});
    res.render("articles.ejs", { articles: articles });
  } catch (err) {
    next(err);
  }
});

router.get("/new", (req, res) => {
  res.render("addArticle.ejs");
});

router.post("/", async (req, res, next) => {
  try {
    var article = await Article.create(req.body);
    res.redirect("/users/articles");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    var id = req.params.id;
    var article = await Article.findById(id);

    res.render("articleDetails.ejs", { article });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    var id = req.params.id;
    var article = await Article.findById(id);

    res.render("editArticleForm", { article });
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    var id = req.params.id;

    var article = await Article.findByIdAndUpdate(id, req.body);
    res.redirect("/articles/" + id);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/delete", async (req, res, next) => {
  try {
    var id = req.params.id;
    var article = await Article.findByIdAndDelete(id);
    res.redirect("/articles");
  } catch (err) {
    next(err);
  }
});

router.get("/:id/likes", async (req, res, next) => {
  try {
    var id = req.params.id;
    var article = await Article.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    res.redirect("/articles/" + id);
  } catch (err) {
    next(err);
  }
});
router.get("/:id/dislikes", async (req, res, next) => {
  try {
    var id = req.params.id;
    var article = await Article.findByIdAndUpdate(id, { $inc: { likes: -1 } });
    res.redirect("/articles/" + id);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/comments", async (req, res, next) => {
  try {
    console.log(req.body);
    var id = req.params.id;
    req.body.articleId = id;
    var comment = await Comment.create(req.body);
    res.redirect("/articles/" + id);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
