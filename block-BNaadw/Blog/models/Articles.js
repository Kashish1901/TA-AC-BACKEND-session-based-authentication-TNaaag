var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var articleSchema = new Schema({
  title: String,
  description: String,
  likes: Number,
  commemnts: [String],
  author: String,
  slug: String,
});

module.exports = mongoose.model("Article", articleSchema);
