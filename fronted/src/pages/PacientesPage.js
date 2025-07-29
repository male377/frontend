import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2 } from 'lucide-react';

const PacientesPage = () => {
  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      nombre: 'María García',
      cedula: '12345678',
      telefono: '555-0123',
      email: 'maria@email.com',
      fechaNacimiento: '1985-03-15',
      direccion: 'Calle 123 #45-67'
    },
    {
      id: 2,
      nombre: 'Juan Pérez',
      cedula: '87654321',
      telefono: '555-0456',
      email: 'juan@email.com',
      fechaNacimiento: '1990-07-22',
      direccion: 'Carrera 89 #12-34'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    email: '',
    fechaNacimiento: '',
    direccion: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPaciente) {
      setPacientes(pacientes.map(p => 
        p.id === editingPaciente.id ? { ...formData, id: editingPaciente.id } : p
      ));
      toast.success('Paciente actualizado exitosamente');
    } else {
      const newPaciente = {
        ...formData,
        id: Date.now()
      };
      setPacientes([...pacientes, newPaciente]);
      toast.success('Paciente registrado exitosamente');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      cedula: '',
      telefono: '',
      email: '',
      fechaNacimiento: '',
      direccion: ''
    });
    setShowForm(false);
    setEditingPaciente(null);
  };

  const handleEdit = (paciente) => {
    setFormData(paciente);
    setEditingPaciente(paciente);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      setPacientes(pacientes.filter(p => p.id !== id));
      toast.success('Paciente eliminado exitosamente');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Gestión de Pacientes</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={16} style={{ marginRight: '5px' }} />
          Nuevo Paciente
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>{editingPaciente ? 'Editar Paciente' : 'Registrar Nuevo Paciente'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cédula</label>
                <input
                  type="text"
                  name="cedula"
                  className="form-control"
                  value={formData.cedula}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  className="form-control"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  className="form-control"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  className="form-control"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">
                {editingPaciente ? 'Actualizar' : 'Registrar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h2>Lista de Pacientes</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Fecha Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(paciente => (
              <tr key={paciente.id}>
                <td>{paciente.nombre}</td>
                <td>{paciente.cedula}</td>
                <td>{paciente.telefono}</td>
                <td>{paciente.email}</td>
                <td>{paciente.fechaNacimiento}</td>
                <td>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleEdit(paciente)}
                    style={{ marginRight: '5px' }}
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(paciente.id)}
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

export default PacientesPage;