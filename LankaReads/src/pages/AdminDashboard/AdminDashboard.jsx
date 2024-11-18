import React from 'react';
import './AdminDashboard.css';
import AdminHeader from '../../components/AdminHeader/AdminHeader';

function AdminDashboard() {
  return (
    <>

<AdminHeader />
    <div className="dashboard-container">
      
      <div className="dashboard-content">
        <div className="welcome-message">
          <h1>Welcome to the Admin Dashboard!</h1>
        </div>
      </div>
    </div></>
  );
}

export default AdminDashboard;
