const express = require('express');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const https = require("https");
const { log } = require('console');

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
  // console.log("Post recieved");
  const cityName=req.body.cityName;
  
  log(cityName);
  const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7ce6dc0d32f24e5c61db45a48179fc01&units=metric`;


  https.get(apiEndpoint,(response)=>{
    log(response.statusCode);

    response.on('data',(chunk)=>{
      const weatherData=JSON.parse(chunk);
      const name=weatherData.name;
      const temperature=weatherData.main.temp;
      const description=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const image=` https://openweathermap.org/img/wn/${icon}@2x.png`
      console.log(name,temperature,description);
      res.write(`<h1>Weather App </h1>`);
      res.write(`<p>The weather in ${name} is ${description} and the temperature is ${temperature}</p>`);
      res.write(`<img src=${image}>`);
      res.send();
      res.end();
    })
  })
})



app.listen(5000, () => {
  console.log("server is running on port 3000");
})