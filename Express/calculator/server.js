const express=require('express');
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
  var num1=Number(req.body.num1);
  var num2=Number(req.body.num2);
  var result=num1+num2;
  res.send("The result is : "+result)
})


app.get('/bmiCalculator',(req,res)=>{
  res.sendFile(__dirname+"/BMIcalculator.html")
  
})

app.post("/bmiCalculator",(req,res)=>{
  var height=Number(req.body.height)
  var weight=Number(req.body.weight)
  var bmi=weight/(height*height);
  res.send("Your Body Mass Index is : "+bmi)
})

app.listen(3000,()=>{

  console.log("listening to port 3000")
})