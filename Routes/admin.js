const express = require("express");
const { adminModel } = require("../db");
const Router = express.Router;
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_ADMIN_PASSWORD = "ihateJUIT";

const adminRouter = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1)
});

adminRouter.post("/signup", async function(req, res){
try {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid input format",
        errors: parsedData.error.issues
      });
    }

    const { email, password, firstName, lastName } = parsedData.data;

    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    res.json({
      message: "Admin created successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

adminRouter.post("/signin", async function(req, res){
try {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid input format",
        errors: parsedData.error.issues
      });
    }

    const { email, password } = parsedData.data;

    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Incorrect credentials (booooooo)" 
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({
        id: user._id
      }, JWT_ADMIN_PASSWORD);

      res.json({
        token: token
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials (booooooo)" 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
})

adminRouter.post("/courses", function(req, res){
  res.json({
    message: "courses endpoint"
  })
})  

module.exports = {
  adminRouter: adminRouter
}