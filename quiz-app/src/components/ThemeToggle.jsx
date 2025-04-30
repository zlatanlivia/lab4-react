import React from 'react';

function ThemeToggle({ toggleTheme, theme }) {
  return (
    <button className={`theme-toggle ${theme}`} onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}

export default ThemeToggle;
