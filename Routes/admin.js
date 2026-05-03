const express = require("express");
const { adminModel, courseModel } = require("../db");
const Router = express.Router;
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const {adminMiddleware} = require("../middleware/admin");  

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

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
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

    const Admin = await adminModel.findOne({ email });
    if (!Admin) {
      return res.status(403).json({
        message: "Incorrect credentials (booooooo)" 
      });
    }

    const passwordMatch = await bcrypt.compare(password, Admin.password);
    if (passwordMatch) {
      const token = jwt.sign({
        id: Admin._id
      }, JWT_ADMIN_PASSWORD);

      res.json({
        token: token,
        firstName: Admin.firstName
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

adminRouter.post("/course", adminMiddleware, async function(req, res){

  const adminId = req.adminId;
  const {title, description, price, imageUrl} = req.body;
  const course = await courseModel.create({
    title,
    description,
    price,
    imageUrl,
    creatorId: adminId
  })

  res.json({
    message: "course creator - LORD",
    courseId: course._id 
  })
})  

adminRouter.put("/courses", adminMiddleware, async function(req, res){
  const adminId = req.adminId;  

  const { courseId, 
    title,
    description,
    price,
    imageUrl
  } = req.body;

  const course = await courseModel.updateOne({
    _id: courseId ,
    creatorId: adminId 
  }, {
    $set: {
      title,
      description,
      price,
      imageUrl
    }
  })

  res.json({
    message: "Course updated successfully",
    courseId: course._id
  })
})

adminRouter.get("/course/bulk", adminMiddleware, async function(req, res,){
  const adminId = req.userId;
  const courses = await courseModel.find({
    creatorId: adminId 
  });

  res.json({
    message: "Courses fetched successfully",
    courses
  })
})

module.exports = {
  adminRouter: adminRouter
}