const express = require("express");
const Router = express.Router;

const courseRouter = Router();

courseRouter.get("/purchase", function(req, res){
  res.json({
    message: "courses endpoint"
  })
})

courseRouter.post("/preview", function(req, res){
  res.json({
    message: "purchase endpoint"
  })
})

module.exports = {
  courseRouter: courseRouter
}