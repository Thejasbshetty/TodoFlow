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

function TodosMobile() {
  const [todos, setTodos] = useState([]);
  const [showCreateTodo, setShowCreateTodo] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://todos-backend-i1uv.onrender.com/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://todos-backend-i1uv.onrender.com/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
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
      await axios.delete(`https://todos-backend-i1uv.onrender.com/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleMarkAsDone = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://todos-backend-i1uv.onrender.com/api/todos/${id}`, { completed: true }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error('Error marking todo as done:', error);
    }
  };

  const handleCloseCreateTodo = () => {
    setShowCreateTodo(false);
    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const formatMobileDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Todos</h2>
        <UserProfileDropdown user={user} handleLogout={handleLogout} />
      </div>

      <TodoButton setShowCreateTodo={setShowCreateTodo} />

      {showCreateTodo ? (
        <CreateTodos fetchTodos={fetchTodos} onClose={handleCloseCreateTodo} />
      ) : (
        <div className="mt-4 space-y-4">
          {todos.map(todo => (
            <div key={todo._id} className={`bg-gray-50 p-4 rounded-lg border ${todo.completed ? 'bg-green-100' : ''}`}>
              <h3 className="font-bold text-lg text-gray-800">{todo.title}</h3>
              <p className="text-gray-600">Description: {todo.description}</p>
              <p className="text-gray-600">Due Date: {todo.dueDate ? formatMobileDate(todo.dueDate) : 'N/A'}</p>
              <p className="text-gray-600">Priority: {todo.priority}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleMarkAsDone(todo._id)}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodosMobile;