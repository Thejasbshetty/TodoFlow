import React, { useState } from 'react';
import axios from 'axios';

function CreateTodos({ fetchTodos }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/todos', { title }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTitle(''); // Clear input field
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default CreateTodos;
