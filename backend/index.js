const express = require("express");
const { createTodo, updateTodo } = require("./types");
const app = express();
const { todo } = require("./database");

app.use(express.json());

app.post('/todo', async function(req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if(!parsedPayload.success) {
     res.status(411).json({ error: "Invalid input" });
     return;
  }
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false
  })

  res.json({
    msg: "Todo created successfully"
  })
});

app.get("/todos", async function(req, res) {
    const todo = await todo.find({});
    res.json({
        todos: todo
    });
});

app.put("/completed" , async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
       res.status(411).json({ error: "Invalid input" });
       return;
    }
    await todo.updateOne({
        _id: req.body.id
    }, {
        completed: true
    })
    res.json({
        msg: "Todo completed successfully"
    });
});


