const demoLogger = require("./Middlewares/logger");
const express = require("express");
const req = require("express/lib/request");
const PORT = 5000;
const app = express();
app.get("/", (req, res) => {
  res.send("This is the home Page");
});
app.get("/about", (req, res) => {
  res.send("This is the About page");
});
app.post("/add", (req, res) => {
  res.send("Post request");
});
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
app.use(demoLogger);
