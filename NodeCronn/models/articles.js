var mongoose = require("mongoose");

var fakerSchema = new mongoose.Schema({
  id: String,
  name: String,
  content: String,
});

module.exports = mongoose.model("fakeCollectionUsingCron", fakerSchema);
