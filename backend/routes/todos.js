const express = require('express');
const Todo = require('../models/Todo');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// Middleware to protect routes
router.use(verifyToken);

// Get todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching todos', error });
  }
});

// Create todo
router.post('/', async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    user: req.userId
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo', error });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting todo', error });
  }
});

module.exports = router;
