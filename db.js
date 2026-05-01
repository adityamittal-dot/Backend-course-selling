const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = Schema({
  email: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String,
});

const adminSchema = Schema({
  email: {type: String, required: true, unique: true},
  password: String,
  firstName: String,
  lastName: String,

});

const courseSchema = Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const purchaseSchema = Schema({
  userId: ObjectId, // refers to course schema
  courseId: ObjectId // refers to user schema
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel
}