import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://todos-backend-i1uv.onrender.com/api/auth/login', formData);
      alert('Login successful!');
      localStorage.setItem('token', res.data.token);
      navigate('/todos');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">TO-DO</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email or Phone Number"
              onChange={handleChange}
              required
              className="shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Log In
            </button>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <span className="text-gray-600">Don't have an account?</span>
            <a href="/signup" className="text-blue-600 hover:underline"> Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
