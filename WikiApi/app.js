//import all important modules////////////////////////
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose')

// making connections to mongodb database//////////////////////////
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");


// set middleware//////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



// writing Schema for article collection////////////////////////
const articlesSchema = mongoose.Schema({
  title: String,
  content: String
})

const Article = mongoose.model("Article", articlesSchema);



// defning Routes.



// defining /articles route//////////////////////////////////////////
app.route("/articles")
  .get((req, res) => {
    Article.find({})
      .then((articles) => {
        res.send(articles);
      })
      .catch((err) => {
        console.log(err);
      })
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    })
    newArticle.save()
      .then((result) => {
        res.send("Successfully posted");
      })
      .catch((err) => {
        res.send(err);
      })
  })
  .delete((req, res) => {
    Article.deleteMany({})
      .then((result) => {
        res.send("Deleted Successfully");
      })
      .catch((err) => {
        res.send(err);
      })
  })


// defining /articles/{all   articles}////////////////////////////////////

app.route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle })
      .then((foundArticle) => {
        if (foundArticle) res.send(foundArticle);
        else res.send("Article not found!");
      })
      .catch(err => res.send(err))
  })
  .patch((req,res)=>{
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set:req.body},
    )
    .then((result)=>{
      res.send(result);
      console.log(result);
    })
    .catch((err)=>{
      res.send(err);
    })
  })
  .put((req,res)=>{
    Article.replaceOne(
      { title:req.params.articleTitle },
      {title:req.body.title,content:req.body.content}
    )
    .then((result)=>{
      res.send(result);
      console.log(result);
    })
    .catch((err)=>{
      res.send(err);
    })
  })
  .delete((req,res)=>{
    Article.deleteOne({title:req.params.articleTitle})
    .then((result)=>{
      res.send("successfully deleted");
    })
    .catch((err)=>{
      res.send(err);
        })
  })

// listening to the port 3000///////////////////////////////////////////
app.listen(3000, () => {
  console.log("server is running on port 3000");
})