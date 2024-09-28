import React from "react";

const Todos = ({ todos, setTodos }) => {
  const handleComplete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/completed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h2>{todo.title}</h2>
          <h3>{todo.description}</h3>
          <button onClick={() => handleComplete(todo._id)}>
            {todo.completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
