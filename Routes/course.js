const express = require("express");
const Router = express.Router;

const courseRouter = Router();

courseRouter.get("/courses", function(req, res){
  res.json({
    message: "courses endpoint"
  })
})

courseRouter.post("/course/purchase", function(req, res){
  res.json({
    message: "purchase endpoint"
  })
})

module.exports = {
  courseRouter: courseRouter
}