const express = require("express");
const jwt = require("jsonwebtoken");

const app = express()

app.post("/user/signup", function(req, res){
  res.json({
    message: "signup endpoint"
  })
})

app.post("/user/signin", function(req, res){
  res.json({
    message: "signin endpoint"
  })
})

app.get("/user/purchases", function(req, res){
  res.json({
    message: "purchases endpoint"
  })
})

app.get("/courses", function(req, res){
  res.json({
    message: "courses endpoint"
  })
})

app.post("/course/purchase", function(req, res){
  res.json({
    message: "purchase endpoint"
  })
})






app.listen(3000);