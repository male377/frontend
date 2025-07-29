import React from 'react';
import { Users, Calendar, FileText, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Pacientes', value: '1,234', icon: Users, color: '#007bff' },
    { title: 'Citas Hoy', value: '28', icon: Calendar, color: '#28a745' },
    { title: 'Historiales', value: '856', icon: FileText, color: '#ffc107' },
    { title: 'Facturas Pendientes', value: '12', icon: CreditCard, color: '#dc3545' }
  ];

  return (
    <div>
      <h1>Dashboard - Sistema de Gestión Médica</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {stats.map((stat, index) => (
          <div key={index} className="card" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <stat.icon size={40} color={stat.color} />
            </div>
            <h3 style={{ color: stat.color, fontSize: '2rem', margin: '10px 0' }}>{stat.value}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <h2>Citas de Hoy</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09:00</td>
              <td>María García</td>
              <td>Dr. López</td>
              <td><span style={{ color: '#28a745' }}>Confirmada</span></td>
            </tr>
            <tr>
              <td>10:30</td>
              <td>Juan Pérez</td>
              <td>Dra. Martínez</td>
              <td><span style={{ color: '#ffc107' }}>Pendiente</span></td>
            </tr>
            <tr>
              <td>14:00</td>
              <td>Ana Rodríguez</td>
              <td>Dr. González</td>
              <td><span style={{ color: '#28a745' }}>Confirmada</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;