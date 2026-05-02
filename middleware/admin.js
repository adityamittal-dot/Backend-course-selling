const express = require("express");
const Router = express.Router();
const { JWT_ADMIN_PASSWORD } = require("../config");
const jwt = require("jsonwebtoken");  


function adminMiddleware(req, res, next){
  const token = req.headers.token;
  try {
    const decode = jwt.verify(token, JWT_ADMIN_PASSWORD);

    if (decode) {
      req.adminId = decode.id;
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
  adminMiddleware: adminMiddleware
}