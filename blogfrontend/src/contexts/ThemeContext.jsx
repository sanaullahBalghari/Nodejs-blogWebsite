import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme Context
export const ThemeContext = createContext();

// Custom hook
const useTheme = () => useContext(ThemeContext);

// Theme Provider Component
function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, useTheme };
