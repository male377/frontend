import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, DollarSign, CreditCard, Check } from 'lucide-react';

const FacturacionPage = () => {
  const [facturas, setFacturas] = useState([
    {
      id: 1,
      numero: 'FAC-001',
      paciente: 'María García',
      fecha: '2025-01-20',
      servicios: [
        { descripcion: 'Consulta general', precio: 50000 },
        { descripcion: 'Examen de laboratorio', precio: 30000 }
      ],
      total: 80000,
      estado: 'Pendiente'
    },
    {
      id: 2,
      numero: 'FAC-002',
      paciente: 'Juan Pérez',
      fecha: '2025-01-18',
      servicios: [
        { descripcion: 'Consulta especializada', precio: 80000 }
      ],
      total: 80000,
      estado: 'Pagada'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    paciente: '',
    fecha: '',
    servicios: [{ descripcion: '', precio: '' }]
  });

  const pacientes = ['María García', 'Juan Pérez', 'Ana Rodríguez'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServicioChange = (index, field, value) => {
    const newServicios = [...formData.servicios];
    newServicios[index][field] = value;
    setFormData({
      ...formData,
      servicios: newServicios
    });
  };

  const addServicio = () => {
    setFormData({
      ...formData,
      servicios: [...formData.servicios, { descripcion: '', precio: '' }]
    });
  };

  const removeServicio = (index) => {
    const newServicios = formData.servicios.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      servicios: newServicios
    });
  };

  const calculateTotal = () => {
    return formData.servicios.reduce((total, servicio) => {
      return total + (parseFloat(servicio.precio) || 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newFactura = {
      id: Date.now(),
      numero: `FAC-${String(facturas.length + 1).padStart(3, '0')}`,
      ...formData,
      servicios: formData.servicios.map(s => ({
        ...s,
        precio: parseFloat(s.precio)
      })),
      total: calculateTotal(),
      estado: 'Pendiente'
    };
    
    setFacturas([...facturas, newFactura]);
    toast.success('Factura generada exitosamente');
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      paciente: '',
      fecha: '',
      servicios: [{ descripcion: '', precio: '' }]
    });
    setShowForm(false);
  };

  const handlePago = (id) => {
    setFacturas(facturas.map(f => 
      f.id === id ? { ...f, estado: 'Pagada' } : f
    ));
    toast.success('Pago registrado exitosamente');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  };

  const getEstadoColor = (estado) => {
    return estado === 'Pagada' ? '#28a745' : '#ffc107';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Facturación y Cobro</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={16} style={{ marginRight: '5px' }} />
          Nueva Factura
        </button>
      </div>

      {/* Resumen de facturación */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <DollarSign size={40} color="#28a745" style={{ margin: '0 auto 10px' }} />
          <h3 style={{ color: '#28a745', fontSize: '1.5rem' }}>
            {formatCurrency(facturas.filter(f => f.estado === 'Pagada').reduce((sum, f) => sum + f.total, 0))}
          </h3>
          <p>Total Recaudado</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <CreditCard size={40} color="#ffc107" style={{ margin: '0 auto 10px' }} />
          <h3 style={{ color: '#ffc107', fontSize: '1.5rem' }}>
            {formatCurrency(facturas.filter(f => f.estado === 'Pendiente').reduce((sum, f) => sum + f.total, 0))}
          </h3>
          <p>Pendiente de Cobro</p>
        </div>
      </div>

      {showForm && (
        <div className="card">
          <h2>Generar Nueva Factura</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div className="form-group">
                <label>Paciente</label>
                <select
                  name="paciente"
                  className="form-control"
                  value={formData.paciente}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar paciente</option>
                  {pacientes.map(paciente => (
                    <option key={paciente} value={paciente}>{paciente}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  className="form-control"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <h3>Servicios</h3>
            {formData.servicios.map((servicio, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'end' }}>
                <div className="form-group" style={{ flex: 2 }}>
                  <label>Descripción del Servicio</label>
                  <input
                    type="text"
                    className="form-control"
                    value={servicio.descripcion}
                    onChange={(e) => handleServicioChange(index, 'descripcion', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    value={servicio.precio}
                    onChange={(e) => handleServicioChange(index, 'precio', e.target.value)}
                    required
                  />
                </div>
                {formData.servicios.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => removeServicio(index)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
            
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={addServicio}
              style={{ marginBottom: '20px' }}
            >
              Agregar Servicio
            </button>

            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <h3>Total: {formatCurrency(calculateTotal())}</h3>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                Generar Factura
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h2>Lista de Facturas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map(factura => (
              <tr key={factura.id}>
                <td>{factura.numero}</td>
                <td>{factura.paciente}</td>
                <td>{factura.fecha}</td>
                <td>{formatCurrency(factura.total)}</td>
                <td>
                  <span style={{ 
                    color: getEstadoColor(factura.estado),
                    fontWeight: 'bold'
                  }}>
                    {factura.estado}
                  </span>
                </td>
                <td>
                  {factura.estado === 'Pendiente' && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => handlePago(factura.id)}
                    >
                      <Check size={14} style={{ marginRight: '5px' }} />
                      Registrar Pago
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle de facturas */}
      <div className="card">
        <h2>Detalle de Facturas</h2>
        {facturas.map(factura => (
          <div key={factura.id} className="card" style={{ border: '1px solid #ddd', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <h3 style={{ margin: 0 }}>{factura.numero}</h3>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  {factura.paciente} - {factura.fecha}
                </p>
              </div>
              <span style={{ 
                color: getEstadoColor(factura.estado),
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                {factura.estado}
              </span>
            </div>
            
            <table className="table">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {factura.servicios.map((servicio, index) => (
                  <tr key={index}>
                    <td>{servicio.descripcion}</td>
                    <td>{formatCurrency(servicio.precio)}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 'bold', borderTop: '2px solid #007bff' }}>
                  <td>Total</td>
                  <td>{formatCurrency(factura.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacturacionPage;