const express = require("express");

const https=require("https");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req,res){
  console.log("Post request received.");
  const query = req.body.cityName;
  const apiKey = "efc627f2b993564b2c5b7a50e53e7efe";
  const unit = "metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apiKey +"&units="+ unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData= JSON.parse(data)
      const temp= weatherData.main.temp
      const weatherDescription= weatherData.weather[0].description
      const icon= weatherData.weather[0].icon
      res.write("<p>The weather is currently" + weatherDescription + "<p>");
      res.write("<h1>The temperature in "+ query + " is" + temp + "degrees celcius.</h1>");
      res.send()

    })
  })
})

app.listen(3000,function(){
  console.log("server is running on port 3000.");
});
