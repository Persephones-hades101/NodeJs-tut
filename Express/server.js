const express=require('express');
const app=express();

app.get('/',(req,res)=>{
  res.send("<h1>Hello world</h1>")
})

app.get('/contact',(req,res)=>{
  res.send("Contact me at : sudh4800@gmail.com");
})

app.get('/about',(req,res)=>{
  res.send("<p>Hello this Sudhanshu and I am a sophomore at IIITA . I am fullstack web developer and </p>")
})

app.get('/hobbies',(req,res)=>{
  res.send("<ul><li>Code</li><li>listen music</li><li>Food</li></ul>")
})
app.listen(3000,function(){
  console.log("server started on port 3000")
});