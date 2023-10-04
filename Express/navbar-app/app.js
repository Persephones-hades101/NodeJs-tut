const express = require('express');
const app = express();
// const { readFileSync } = require('fs');
const path = require('path');


app.use(express.static('../public'));


// const homePage = readFileSync('./index.html');
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname,"index.html"));
  res.sendFile(path.resolve(__dirname,"styles.css"));

  // res.send(homePage);
})

app.all('*',(req,res)=>{
  res.status(404).send("<h1>NOT FOUND</h1>");
})

app.listen(5000, () => {
  // console.log(__dirname);
  console.log("listening to port 5000;");
})