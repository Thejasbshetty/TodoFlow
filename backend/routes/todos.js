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
  const { title, description, priority, dueDate } = req.body; // Include dueDate

  const newTodo = new Todo({
    title,
    description,
    user: req.userId,
    priority,
    dueDate // Save the due date
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo', error });
  }
});

// Mark todo as done
// Mark todo as done
router.put('/:id', async (req, res) => {
  const { completed } = req.body; // Get 'completed' status from the request

  try {
    // Find the todo by ID
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update the completed status
    todo.completed = completed; // Set completed status based on request
    // Save the updated todo
    await todo.save();
    return res.status(200).json(todo); // Respond with the updated todo
  } catch (error) {
    console.error('Error updating todo:', error);
    return res.status(500).json({ message: 'Error updating todo', error: error.message }); // Return server error
  }
});


// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if the user is allowed to delete the todo
    if (todo.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting todo', error });
  }
});

module.exports = router;