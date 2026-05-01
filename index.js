require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const { userRouter } = require("./Routes/user");
const { courseRouter } = require("./Routes/course");
const { adminRouter } = require("./Routes/admin");
const app = express()
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main(){
    await mongoose.connect(process.env.DATABASE_URL)

    app.listen(3000, () => {
    console.log("Server is running on port 3000");
    });
}

main()