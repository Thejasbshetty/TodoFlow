const express = require("express");
const Todo = require("../models/Todo");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

// Create Todo
router.post("/", authenticate, async (req, res) => {
  const { title, description } = req.body;

  const todo = new Todo({
    title,
    description,
    user: req.user.id,
  });

  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

// Get Todos
router.get("/", authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
