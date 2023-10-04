const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
// console.log(date());
const items = [];
const workItems = [];
app.get("/", (req, res) => {

  let currentDay = date.getDate();
 
  res.render("list", {
    listTitle: currentDay,
    items: items
  })
})

app.post("/", (req, res) => {
  const newWorkItem = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(newWorkItem);
    res.redirect("/work");
  }
  else {
    items.push(newWorkItem);
    // console.log(req.body);
    res.redirect("/");
  }
})

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    items: workItems
  })
})

app.get("/about", (req, res) => {
  res.render("about");
})


app.listen(5000, () => {
  console.log("Listening to the port No. 5000");
})