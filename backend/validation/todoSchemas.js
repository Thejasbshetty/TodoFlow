// validation/todoSchemas.js
const zod = require('zod');

// Schema for creating a Todo
const createTodo = zod.object({
  title: zod.string().min(1, "Title is required"),
  description: zod.string().optional(),
});

// Schema for updating a Todo as completed
const updateTodo = zod.object({
  id: zod.string().length(24, "Invalid ID format"), // Adjust based on your ID format, e.g., MongoDB ObjectId
});

module.exports = {
  createTodo,
  updateTodo,
};
