import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PacientesPage from './pages/PacientesPage';
import CitasPage from './pages/CitasPage';
import HistorialPage from './pages/HistorialPage';
import FacturacionPage from './pages/FacturacionPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pacientes" element={<PacientesPage />} />
            <Route path="/citas" element={<CitasPage />} />
            <Route path="/historial" element={<HistorialPage />} />
            <Route path="/facturacion" element={<FacturacionPage />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;