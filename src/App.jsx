import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Request from './pages/Request';
import Authorize from './pages/Authorize';
import ThemeSwitcher from './components/ThemeSwitcher';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-base-200">
        {/* Navbar */}
        <nav className="navbar bg-base-100 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex space-x-4">
              <Link to="/" className="btn btn-ghost normal-case text-xl">
                Inicio
              </Link>
            </div>
            {/* Selector de Tema */}
            <ThemeSwitcher />
          </div>
        </nav>

        {/* Contenido Principal */}
        <main className="container mx-auto py-8">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/request" element={<Request />} />
            <Route path="/authorize" element={<Authorize />} />
          </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  );
};

export default App;
