const express = require("express");
const { createTodo, updateTodo } = require("./types");
const app = express();
const Todo = require("./database").todo;

app.use(express.json());

app.post('/todo', async function(req, res) {
  const createPayload = req.body;

  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(400).json({ error: "Invalid input", details: parsedPayload.error.errors });
    return;
  }

  try {
    await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false
    });

    res.status(201).json({
      msg: "Todo created successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

app.get("/todos", async function(req, res) {
  try {
    const todos = await Todo.find({});
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

app.put("/completed", async function(req, res) {
  const updatePayload = req.body;


  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(400).json({ error: "Invalid input", details: parsedPayload.error.errors });
    return;
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
