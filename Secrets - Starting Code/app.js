//jshint esversion:6
//import all important modules
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
// making connections to mongodb database
mongoose.connect("mongodb://127.0.0.1:27017/userDB");


// set middleware and specifying engine for ejs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", 'ejs');



// user schema and User Model

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})





const User = mongoose.model("User", userSchema);



// defning Routes.
app.get("/", (req, res) => {
  res.render("home");
})
app.get("/login", (req, res) => {
  res.render("login");
})
app.get("/register", (req, res) => {
  res.render("register");
})

// Registering user in the users collection
app.post("/register", (req, res) => {

  bcrypt.hash(req.body.password, saltRound, (err, hash) => {
    const user = new User({
      email: req.body.username,
      password: hash
    })

    user.save()
      .then((result) => {
        res.render("secrets");
      })
      .catch((err) => {
        console.log(err);
      })
  })


})

// searching user in the collection to handle the /login route
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password
  User.findOne({ email: username })
    .then((foundUser) => {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, (err, result) => {
          if (result === true) {
            res.render("secrets");
          }
          else {
            console.log("Wrong Password");
            res.redirect("/login");
          }
        })
      }
      else {
        console.log("Wrong User");
        res.redirect("/login");
      }

    })
    .catch((err) => {
      console.log(err);
    })
})

// listening to the port 3000
app.listen(3000, () => {
  console.log("server is running on port 3000");
})