import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';

const TEAL_DARK = '#085041';

export default function SupportDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: TEAL_DARK, marginBottom: 24 }}>Support Dashboard</h2>
        <Routes>
          <Route path="/" element={<p style={{ color: '#6b7280' }}>Support features coming soon.</p>} />
          <Route path="/claims" element={<p style={{ color: '#6b7280' }}>All client claims will appear here.</p>} />
        </Routes>
      </div>
    </div>
  );
}
