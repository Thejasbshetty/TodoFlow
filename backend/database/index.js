// database/index.js
const mongoose = require("mongoose");

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

// Create the Todo model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  todo: Todo,
};
