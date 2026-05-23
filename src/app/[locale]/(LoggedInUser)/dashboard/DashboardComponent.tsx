'use client';

import React from 'react'

import { useLogout } from '@/lib/hooks/auth/useLogout';

const DashboardComponent = () => {

  const { mutate: logoutFN } = useLogout();

  const handleLogout = async () => {
    logoutFN();
    window.location.href = '/auth/login';
  };
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Dashboard</h1>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#B02D1C',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default DashboardComponent