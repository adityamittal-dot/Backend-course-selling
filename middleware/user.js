const express = require("express");
const Router = express.Router();
const { JWT_USER_PASSWORD } = require("../config");
const jwt = require("jsonwebtoken");  


function userMiddleware(req, res, next){
  const token = req.headers.token;
  try {
    const decode = jwt.verify(token, JWT_USER_PASSWORD);

    if (decode) {
      req.userId = decode.id;
      next();
    } else {
      res.status(403).json({
        message: "You are not authorized"
      });
    }
  } catch (error) {
    res.status(403).json({
      message: "You are not authorized"
    });
  }
}

module.exports = {
  userMiddleware: userMiddleware
}