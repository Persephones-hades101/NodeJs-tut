const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _=require("lodash");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

const itemsSchema = new mongoose.Schema({
  name: String
})
const Item = mongoose.model("item", itemsSchema);

const listSchema = new mongoose.Schema({
  name: String,
  listItems: [itemsSchema]
})
const List = new mongoose.model("List", listSchema);




const item1 = new Item({
  name: "Welcome to the todolist"
})

const item2 = new Item({
  name: "click the + button and add the todo"
})
const item3 = new Item({
  name: "click the checkbox to delete the todo"
})

const docArray = [item1, item2, item3];






app.get("/", (req, res) => {
  // let itemsArray=[];
  Item.find()
    .then((result) => {
      if (result.length === 0) {
        Item.insertMany(docArray)
          .then((result) => {
            console.log(`${result.length} documents inserted successfully.`);
          })
          .catch((error) => {
            console.error(`Error inserting documents: ${error}`);
          });
        res.redirect("/");
      }
      else {
        res.render("list", {
          listTitle: "Today",
          items: result
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get("/about", (req, res) => {
  res.render("about");
})


app.get("/:customListName", (req, res) => {
  let customListName = req.params.customListName;
  customListName=_.capitalize(customListName);
  List.findOne({ name: customListName })
    .then((list) => {
      if (!list) {
        const list = new List({
          name: customListName,
          listItems: docArray
        })
        list.save();
        res.redirect("/" + customListName);
      }
      else {
        res.render("list", {
          listTitle: customListName,
          items: list.listItems
        })
      }
    })
})




app.post("/", (req, res) => {
  const newWorkItem = req.body.newItem;
  const listName = req.body.list;

  // console.log(newListItem);

  const newItem = new Item({
    name: newWorkItem
  })
  if (listName === "Today") {

    newItem.save();
    res.redirect("/");
  }
  else {
    List.findOne({ name: listName })
      .then((foundList) => {
        foundList.listItems.push(newItem)
        foundList.save();
        res.redirect("/" + listName);
      }).catch((err) => {
        console.log(err);
      })

  }

})

app.post("/delete", (req, res) => {
  const itemId = req.body.checkbox;
  const listName = req.body.listType;
  if (listName === "Today") {
    Item.findByIdAndRemove(itemId)
      .then((deletedDocument) => {
        if (deletedDocument) {
          console.log('Document deleted:', deletedDocument);
        } else {
          console.log('Document not found.');
        }
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
      });
    res.redirect("/")
  }
  else {
    List.findOne({ name: listName })
      .then((foundList) => {
        foundList.listItems = foundList.listItems.filter((item) => {
          return item._id.toString() !== itemId; 
        })
        foundList.save();
        // console.log(foundList.listItems);
        // foundList.listItems.forEach((item)=>{console.log(item._id.toString()===itemId)})
        res.redirect("/" + listName);
      })
    }
    // console.log("successfully deleted");
  })






app.listen(5000, () => {
  console.log("Listening to the port No. 5000");
})