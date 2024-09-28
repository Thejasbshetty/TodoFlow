import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTodos from './CreateTodos';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [showCreateTodo, setShowCreateTodo] = useState(false); // New state for toggling CreateTodos visibility

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

  const handleMarkAsDone = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/todos/${id}`, { done: true }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Error marking todo as done:', error);
    }
  };

  const handleCloseCreateTodo = () => {
    setShowCreateTodo(false);
    fetchTodos(); // Refresh the todo list after closing
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Todos</h2>

      {/* Add New Todo Button */}
      <div className="text-right mb-4">
        <button 
          onClick={() => setShowCreateTodo(true)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Todo
        </button>
      </div>

      {/* Conditional Rendering of CreateTodos Component */}
      {showCreateTodo ? (
        <CreateTodos fetchTodos={fetchTodos} onClose={handleCloseCreateTodo} />
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left text-gray-600">Title</th>
                <th className="py-2 px-4 text-left text-gray-600">Description</th>
                <th className="py-2 px-4 text-left text-gray-600">Due Date</th>
                <th className="py-2 px-4 text-left text-gray-600">Priority</th>
                <th className="py-2 px-4 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => (
                <tr key={todo._id} className={`hover:bg-gray-100 ${todo.completed ? 'bg-green-100' : ''}`}>
                  <td className="border py-2 px-4">{todo.title}</td>
                  <td className="border py-2 px-4">{todo.description}</td>
                  <td className="border py-2 px-4">{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="border py-2 px-4">{todo.priority}</td>
                  <td className="border py-2 px-4">
                    <button 
                      onClick={() => handleMarkAsDone(todo._id)} 
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-2"
                      disabled={todo.completed}
                    >
                      {todo.completed ? 'Done' : 'Mark as Done'}
                    </button>
                    <button 
                      onClick={() => handleDelete(todo._id)} 
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Todos;
