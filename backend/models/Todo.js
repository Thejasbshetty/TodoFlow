const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
