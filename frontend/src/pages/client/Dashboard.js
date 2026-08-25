import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

const TEAL = '#0F6E56';
const TEAL_DARK = '#085041';
const TEAL_LIGHT = '#E1F5EE';

function ClaimHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, color: TEAL_DARK, marginBottom: 4 }}>Welcome, {user?.full_name} 👋</h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 32 }}>What would you like to do today?</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 700 }}>
        {[
          { icon: 'ti-calendar-check', title: 'Before Treatment', sub: 'Pre-authorization', desc: 'Planning surgery or hospitalization', color: TEAL, path: '/client/new?type=before_treatment' },
          { icon: 'ti-receipt', title: 'After Treatment', sub: 'Reimbursement', desc: 'Already paid, want money back', color: '#1D9E75', path: '/client/new?type=after_treatment' },
          { icon: 'ti-shield-x', title: 'Denied Claim', sub: 'Appeal', desc: 'Claim rejected, need to fight it', color: '#5DCAA5', path: '/client/new?type=denied_appeal' },
        ].map(m => (
          <div key={m.title} onClick={() => navigate(m.path)}
            style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, cursor: 'pointer', borderTop: `3px solid ${m.color}`, transition: 'box-shadow 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,110,86,0.1)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            <div style={{ width: 40, height: 40, background: TEAL_LIGHT, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <i className={`ti ${m.icon}`} style={{ fontSize: 20, color: m.color }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: TEAL_DARK }}>{m.title}</div>
            <div style={{ fontSize: 11, color: m.color, marginBottom: 6 }}>{m.sub}</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<ClaimHome />} />
          <Route path="/new" element={<div style={{ padding: 32 }}><h2 style={{ color: TEAL_DARK }}>New Claim — Coming Soon</h2></div>} />
          <Route path="/claims" element={<div style={{ padding: 32 }}><h2 style={{ color: TEAL_DARK }}>My Claims — Coming Soon</h2></div>} />
          <Route path="/reports" element={<div style={{ padding: 32 }}><h2 style={{ color: TEAL_DARK }}>Reports — Coming Soon</h2></div>} />
        </Routes>
      </div>
    </div>
  );
}
