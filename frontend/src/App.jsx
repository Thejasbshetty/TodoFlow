import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateTodos from './components/CreateTodos';
import Todos from './components/Todos';
import Signup from './pages/Signup';
import Login from './pages/Login';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav>
          {loggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <div>
              <a href="/signup">Signup</a>
              <a href="/login">Login</a>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route
            path="/todos"
            element={loggedIn ? <Todos /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-todo"
            element={loggedIn ? <CreateTodos /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
