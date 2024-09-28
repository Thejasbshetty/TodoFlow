import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTodos from './CreateTodos';

function Todos() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h2>Your Todos</h2>
      <CreateTodos fetchTodos={fetchTodos} />
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
