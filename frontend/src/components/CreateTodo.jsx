import React from 'react';

const CreateTodos = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '300px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 15px',
    marginTop: '10px',
    borderRadius: '4px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#218838',
  };

  const [buttonHover, setButtonHover] = React.useState(false);

  return (
    <div style={containerStyle}>
      <input type="text" placeholder="Title" style={inputStyle} />
      <input type="text" placeholder="Description" style={inputStyle} />
      <button
        style={buttonHover ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
      >
        Add Todo
      </button>
    </div>
  );
};

export default CreateTodos;
