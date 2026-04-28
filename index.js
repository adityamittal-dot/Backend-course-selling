const express = require("express");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./Routes/user");
const { courseRouter } = require("./Routes/course");
const app = express()

app.use("/", userRouter);
app.use("/", courseRouter);

app.listen(3000);