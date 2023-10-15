//import all important modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);







// set middleware and specifying engine for ejs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine','ejs');


// defning Routes.
app.get("/", (req, res) => {
  res.render('index');
})

io.on("connection", (socket) => {
  socket.on("user-message",(message)=>{
    // console.log(message);
    io.emit("message",message);
  })
});

// listening to the port 3000
server.listen(3000, () => {
  console.log("server is running on port 3000");
})