import React, { useState, useEffect } from 'react';
import TodosDesktop from './TodosDesktop'; // The original Todos file you have
import TodosMobile from './TodosMobile'; // The new mobile view

function Todos() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile view if width < 768px
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <TodosMobile /> : <TodosDesktop />;
}

export default Todos;
