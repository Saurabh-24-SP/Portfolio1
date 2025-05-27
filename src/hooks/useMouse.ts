import { useState, useEffect } from 'react';

export const useMouse = () => {
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ mouseX: e.clientX, mouseY: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};
