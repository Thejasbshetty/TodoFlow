import React, { useState } from 'react';
import axios from 'axios';

function CreateTodos() {
  const [todo, setTodo] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/todo', todo);
      alert('Todo added successfully!');
      setTodo({
        title: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo');
    }
  };

  return (
    <div>
      <h2>Add a New Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={todo.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={todo.description}
          onChange={handleChange}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default CreateTodos;
