import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, FileText, Search } from 'lucide-react';

const HistorialPage = () => {
  const [historiales, setHistoriales] = useState([
    {
      id: 1,
      paciente: 'María García',
      fecha: '2025-01-20',
      medico: 'Dr. López',
      diagnostico: 'Hipertensión arterial',
      tratamiento: 'Medicamento antihipertensivo',
      observaciones: 'Control en 15 días'
    },
    {
      id: 2,
      paciente: 'Juan Pérez',
      fecha: '2025-01-18',
      medico: 'Dra. Martínez',
      diagnostico: 'Diabetes tipo 2',
      tratamiento: 'Metformina 500mg',
      observaciones: 'Dieta baja en carbohidratos'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState('');
  const [formData, setFormData] = useState({
    paciente: '',
    fecha: '',
    medico: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: ''
  });

  const pacientes = ['María García', 'Juan Pérez', 'Ana Rodríguez'];
  const medicos = ['Dr. López', 'Dra. Martínez', 'Dr. González'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newHistorial = {
      ...formData,
      id: Date.now()
    };
    
    setHistoriales([...historiales, newHistorial]);
    toast.success('Historial médico registrado exitosamente');
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      paciente: '',
      fecha: '',
      medico: '',
      diagnostico: '',
      tratamiento: '',
      observaciones: ''
    });
    setShowForm(false);
  };

  const filteredHistoriales = selectedPaciente 
    ? historiales.filter(h => h.paciente === selectedPaciente)
    : historiales;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Historial Médico</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={16} style={{ marginRight: '5px' }} />
          Nuevo Registro
        </button>
      </div>

      <div className="card">
        <h3>Filtrar por Paciente</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Search size={20} />
          <select
            className="form-control"
            value={selectedPaciente}
            onChange={(e) => setSelectedPaciente(e.target.value)}
            style={{ maxWidth: '300px' }}
          >
            <option value="">Todos los pacientes</option>
            {pacientes.map(paciente => (
              <option key={paciente} value={paciente}>{paciente}</option>
            ))}
          </select>
          {selectedPaciente && (
            <button 
              className="btn btn-secondary"
              onClick={() => setSelectedPaciente('')}
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="card">
          <h2>Registrar Nuevo Historial Médico</h2>
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
                <label>Fecha de Consulta</label>
                <input
                  type="date"
                  name="fecha"
                  className="form-control"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Diagnóstico</label>
                <textarea
                  name="diagnostico"
                  className="form-control"
                  value={formData.diagnostico}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Tratamiento</label>
                <textarea
                  name="tratamiento"
                  className="form-control"
                  value={formData.tratamiento}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Observaciones</label>
                <textarea
                  name="observaciones"
                  className="form-control"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h2>Registros Médicos</h2>
        {filteredHistoriales.length === 0 ? (
          <p>No hay registros médicos para mostrar.</p>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {filteredHistoriales.map(historial => (
              <div key={historial.id} className="card" style={{ border: '1px solid #ddd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#007bff' }}>{historial.paciente}</h3>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      {historial.fecha} - {historial.medico}
                    </p>
                  </div>
                  <FileText size={24} color="#007bff" />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <div>
                    <h4 style={{ color: '#28a745', marginBottom: '5px' }}>Diagnóstico:</h4>
                    <p>{historial.diagnostico}</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#ffc107', marginBottom: '5px' }}>Tratamiento:</h4>
                    <p>{historial.tratamiento}</p>
                  </div>
                  {historial.observaciones && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <h4 style={{ color: '#dc3545', marginBottom: '5px' }}>Observaciones:</h4>
                      <p>{historial.observaciones}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorialPage;