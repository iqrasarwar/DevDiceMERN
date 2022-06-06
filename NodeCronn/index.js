var express = require("express");
var faker = require("faker");
var mongoose = require("mongoose");
var path = require("path");
var fakerModel = require("./models/articles");
var cron = require("node-cron");
var request = require("request");

mongoose
  .connect(
    "mongodb+srv://iqrasarwar:amat123@cluster0.nnfcqvj.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log("error occured", err));

var app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.get("/", (req, res) => {
  fakerModel.find((err, data) => {
    console.log("data", data);
    if (err) {
      console.log("error", err);
    } else if (data) {
      console.log("have data", data);
      res.render("home", { data: data });
    } else {
      console.log("dont have data", data);
      res.render("home", { data: {} });
    }
  });
});

app.post("/", (req, res) => {
  for (var i = 0; i < 1000; i++) {
    var fakke = new fakerModel({
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      content: faker.lorem.words(10),
    });
    fakke.save((err, data) => {
      if (err) {
        console.log("error occured", err);
      }
    });
  }
  res.redirect("/");
});

app.post("/new100articles", (req, res) => {
  for (var i = 0; i < 100; i++) {
    var fakke = new fakerModel({
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      content: faker.lorem.words(10),
    });
    fakke.save((err, data) => {
      if (err) {
        console.log("error occured", err);
      }
    });
  }
  res.redirect("/");
});

cron.schedule("* * * * *", function () {
  console.log("running a task every minute");
  request.post(
    "http://localhost:3000/new100articles",
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("body");
        console.log(body);
      }
      else
        console.log("error"+error)
    }
  );
});
var port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running at ${port}`));

module.exports = app;
