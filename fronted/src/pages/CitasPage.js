import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

const CitasPage = () => {
  const [citas, setCitas] = useState([
    {
      id: 1,
      paciente: 'María García',
      medico: 'Dr. López',
      fecha: '2025-01-27',
      hora: '09:00',
      motivo: 'Consulta general',
      estado: 'Confirmada'
    },
    {
      id: 2,
      paciente: 'Juan Pérez',
      medico: 'Dra. Martínez',
      fecha: '2025-01-27',
      hora: '10:30',
      motivo: 'Control de presión',
      estado: 'Pendiente'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [formData, setFormData] = useState({
    paciente: '',
    medico: '',
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'Pendiente'
  });

  const pacientes = ['María García', 'Juan Pérez', 'Ana Rodríguez'];
  const medicos = ['Dr. López', 'Dra. Martínez', 'Dr. González'];
  const estados = ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCita) {
      setCitas(citas.map(c => 
        c.id === editingCita.id ? { ...formData, id: editingCita.id } : c
      ));
      toast.success('Cita actualizada exitosamente');
    } else {
      const newCita = {
        ...formData,
        id: Date.now()
      };
      setCitas([...citas, newCita]);
      toast.success('Cita programada exitosamente');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      paciente: '',
      medico: '',
      fecha: '',
      hora: '',
      motivo: '',
      estado: 'Pendiente'
    });
    setShowForm(false);
    setEditingCita(null);
  };

  const handleEdit = (cita) => {
    setFormData(cita);
    setEditingCita(cita);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de cancelar esta cita?')) {
      setCitas(citas.filter(c => c.id !== id));
      toast.success('Cita cancelada exitosamente');
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Confirmada': return '#28a745';
      case 'Pendiente': return '#ffc107';
      case 'Cancelada': return '#dc3545';
      case 'Completada': return '#007bff';
      default: return '#6c757d';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Gestión de Citas Médicas</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={16} style={{ marginRight: '5px' }} />
          Nueva Cita
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>{editingCita ? 'Editar Cita' : 'Programar Nueva Cita'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
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
                <label>Médico</label>
                <select
                  name="medico"
                  className="form-control"
                  value={formData.medico}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar médico</option>
                  {medicos.map(medico => (
                    <option key={medico} value={medico}>{medico}</option>
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
              <div className="form-group">
                <label>Hora</label>
                <input
                  type="time"
                  name="hora"
                  className="form-control"
                  value={formData.hora}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  name="estado"
                  className="form-control"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                >
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Motivo de la Consulta</label>
                <textarea
                  name="motivo"
                  className="form-control"
                  value={formData.motivo}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                {editingCita ? 'Actualizar' : 'Programar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h2>Lista de Citas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Motivo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map(cita => (
              <tr key={cita.id}>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.paciente}</td>
                <td>{cita.medico}</td>
                <td>{cita.motivo}</td>
                <td>
                  <span style={{ 
                    color: getEstadoColor(cita.estado),
                    fontWeight: 'bold'
                  }}>
                    {cita.estado}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleEdit(cita)}
                    style={{ marginRight: '5px' }}
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(cita.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CitasPage;