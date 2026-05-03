require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const { userRouter } = require("./Routes/user");
const { courseRouter } = require("./Routes/course");
const { adminRouter } = require("./Routes/admin");
const app = express()

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start the server (ignored by Vercel if exported)
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + (process.env.PORT || 3000));
});

// Export the app for Vercel Serverless deployment
module.exports = app;