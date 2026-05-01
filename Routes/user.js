const express = require("express");
const Router = express.Router;
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { userModel } = require("../db");

const userRouter = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1)
});

userRouter.post("/signup", async function(req, res){
  try {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "Invalid input format",
        errors: parsedData.error.issues
      });
    }

    const { email, password, firstName, lastName } = parsedData.data;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    res.json({
      message: "User created successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post("/signin", function(req, res){
  res.json({
    message: "signin endpoint"
  })
})

userRouter.get("/purchases", function(req, res){
  res.json({
    message: "purchases endpoint"
  })
})

module.exports = {
  userRouter: userRouter
}
