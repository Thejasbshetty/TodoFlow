import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos');
        setTodos(res.data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
        alert('Failed to fetch todos');
      }
    };

    fetchTodos();
  }, []);

  const handleCompleteTodo = async (id) => {
    try {
      await axios.put(`http://localhost:3000/completed`, { id });
      setTodos(todos.map(todo => (todo._id === id ? { ...todo, completed: true } : todo)));
    } catch (error) {
      console.error('Error completing todo:', error);
      alert('Failed to complete todo');
    }
  };

  return (
    <div>
      <h2>Your Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}: {todo.description}
            </span>
            {!todo.completed && <button onClick={() => handleCompleteTodo(todo._id)}>Mark Complete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
