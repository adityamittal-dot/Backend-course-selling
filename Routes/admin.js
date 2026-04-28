const express = require("express");
const Router = express.Router;

const adminRouter = Router();

adminRouter.post("/signup", function(req, res){
  res.json({
    message: "signup endpoint"
  })
})

adminRouter.post("/signin", function(req, res){
  res.json({
    message: "signin endpoint"
  })
})

adminRouter.post("/courses", function(req, res){
  res.json({
    message: "courses endpoint"
  })
})  

module.exports = {
  adminRouter: adminRouter
}