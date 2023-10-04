const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
app.use(bodyParser.urlencoded({ extended: true }));
const request = require('request');
app.use(express.static('./public'));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };


  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/86c2530397";
  const option = {
    method: "POST",
    auth: "Sudh1:ae5008f48a18840ebcf4a8e73c10bf81-us21"
  }
  const Request = https.request(url, option, (response) => {
    const statusCode = response.statusCode;

    if (statusCode === 200) {
      res.sendFile(__dirname+"/success.html");
    }
    else {
      res.sendFile(__dirname+"/failure.html");
    }
    // response.on("data",(data)=>{
    //   console.log(JSON.parse(data));
    // })
  })

  Request.write(jsonData);
  Request.end();
})

app.post("/failure",(req,res)=>{
  res.redirect("/");
})


app.listen(5000, () => {
  console.log("listening to port 5000");
})

// apikey
// ae5008f48a18840ebcf4a8e73c10bf81-us21


// list id
// 86c2530397