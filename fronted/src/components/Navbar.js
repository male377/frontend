import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/pacientes" 
            className={`nav-link ${isActive('/pacientes') ? 'active' : ''}`}
          >
            Pacientes
          </Link>
        </li>
        <li>
          <Link 
            to="/citas" 
            className={`nav-link ${isActive('/citas') ? 'active' : ''}`}
          >
            Citas Médicas
          </Link>
        </li>
        <li>
          <Link 
            to="/historial" 
            className={`nav-link ${isActive('/historial') ? 'active' : ''}`}
          >
            Historial Médico
          </Link>
        </li>
        <li>
          <Link 
            to="/facturacion" 
            className={`nav-link ${isActive('/facturacion') ? 'active' : ''}`}
          >
            Facturación
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;