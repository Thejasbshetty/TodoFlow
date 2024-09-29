import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTodos from './CreateTodos';
import { useNavigate } from 'react-router-dom';

const UserProfileDropdown = ({ user, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      {user ? (
        <>
          <button
            className="flex items-center text-gray-700 hover:text-blue-500 focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={user.avatar || 'https://via.placeholder.com/40'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 w-48 bg-white shadow-lg mt-2 rounded-md z-10">
              <div className="px-4 py-3 border-b">
                <h4 className="font-bold text-lg">{user.username}</h4>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="block text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-600">User details not found.</p>
      )}
    </div>
  );
};

const TodoButton = ({ setShowCreateTodo }) => (
  <div className="text-right mb-4">
    <button
      onClick={() => setShowCreateTodo(true)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
    >
      Add New Todo
    </button>
  </div>
);

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [showCreateTodo, setShowCreateTodo] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://todo-backend-vglo.onrender.com/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to fetch todos.');
    }
  };

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://todo-backend-vglo.onrender.com/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchUserDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://todo-backend-vglo.onrender.com/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo.');
    }
  };

  const handleMarkAsDone = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      // Optimistically update the UI
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !currentStatus } : todo
      );
      setTodos(updatedTodos);

      // Send the update request to the server
      await axios.put(
        `https://todo-backend-vglo.onrender.com/api/todos/${id}`,
        { completed: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error('Error marking todo as done:', err);
      setError('Failed to mark todo as done.');
      fetchTodos(); // Re-fetch todos to maintain state consistency
    }
  };

  const handleCloseCreateTodo = () => {
    setShowCreateTodo(false);
    fetchTodos(); // Fetch todos again to include the newly created one
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Todos</h2>
        <UserProfileDropdown user={user} handleLogout={handleLogout} />
      </div>

      <TodoButton setShowCreateTodo={setShowCreateTodo} />

      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      {showCreateTodo ? (
        <CreateTodos fetchTodos={fetchTodos} onClose={handleCloseCreateTodo} />
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-gray-50 border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600">Title</th>
                <th className="py-3 px-4 text-left text-gray-600">Description</th>
                <th className="py-3 px-4 text-left text-gray-600">Due Date</th>
                <th className="py-3 px-4 text-left text-gray-600">Priority</th>
                <th className="py-3 px-4 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id} className={`hover:bg-gray-100 ${todo.completed ? 'bg-green-100' : ''}`}>
                  <td className="border py-2 px-4">{todo.title}</td>
                  <td className="border py-2 px-4">{todo.description}</td>
                  <td className="border py-2 px-4">{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="border py-2 px-4">{todo.priority}</td>
                  <td className="border py-2 px-4">
                    <button
                      onClick={() => handleMarkAsDone(todo._id, todo.completed)}
                      className={`bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-2 ${todo.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
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
};

export default Todos;
