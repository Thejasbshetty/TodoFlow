// server.js
const express = require("express");
const { createTodo, updateTodo } = require("./validation/todoSchemas");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./database").todo;
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create Todo
app.post('/todo', async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    return res.status(400).json({ error: "Invalid input", details: parsedPayload.error.errors });
  }

  try {
    const newTodo = await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false
    });

    res.status(201).json({
      msg: "Todo created successfully",
      todo: newTodo
    });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// Get Todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// Update Todo as Completed
app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    return res.status(400).json({ error: "Invalid input", details: parsedPayload.error.errors });
  }

  try {
    const result = await Todo.updateOne({ _id: req.body.id }, { completed: true });

    if (result.nModified === 0) {
      res.status(404).json({ msg: "Todo not found" });
    } else {
      res.json({ msg: "Todo completed successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
