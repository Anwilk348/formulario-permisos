// ThemeSwitcher.jsx
import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const changeTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const themes = ['light', 'dark', 'corporate', 'luxury', 'cupcake'];

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-outline">
        Cambiar Tema
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        {themes.map((theme) => (
          <li key={theme}>
            <button
              className={`btn btn-ghost ${currentTheme === theme ? 'btn-active font-bold' : ''
                }`}
              onClick={() => changeTheme(theme)}
            >
              {theme}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
