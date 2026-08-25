import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TEAL = '#0F6E56';
const TEAL_DARK = '#085041';

const navItems = {
  client: [
    { icon: 'ti-plus', label: 'New Claim', path: '/client/new' },
    { icon: 'ti-list', label: 'My Claims', path: '/client/claims' },
    { icon: 'ti-download', label: 'Reports', path: '/client/reports' },
    { icon: 'ti-user', label: 'Profile', path: '/client/profile' },
  ],
  support: [
    { icon: 'ti-list', label: 'All Claims', path: '/support/claims' },
    { icon: 'ti-message', label: 'Notes', path: '/support/notes' },
    { icon: 'ti-users', label: 'Clients', path: '/support/clients' },
  ],
  admin: [
    { icon: 'ti-dashboard', label: 'Dashboard', path: '/admin' },
    { icon: 'ti-users', label: 'Users', path: '/admin/users' },
    { icon: 'ti-list', label: 'All Claims', path: '/admin/claims' },
    { icon: 'ti-chart-bar', label: 'Analytics', path: '/admin/analytics' },
    { icon: 'ti-settings', label: 'Settings', path: '/admin/settings' },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const items = navItems[user?.role] || navItems.client;

  return (
    <div style={{ width: 200, background: TEAL_DARK, minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '20px 0', flexShrink: 0 }}>
      <div style={{ padding: '0 16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: '#E1F5EE', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-shield-check" style={{ fontSize: 15, color: TEAL }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#E1F5EE' }}>ClearClaim</div>
            <div style={{ fontSize: 9, color: '#5DCAA5', letterSpacing: '0.04em' }}>AI ASSISTANT</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 8px' }}>
        {items.map(item => {
          const active = location.pathname === item.path;
          return (
            <div key={item.path} onClick={() => navigate(item.path)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, marginBottom: 2, cursor: 'pointer', background: active ? 'rgba(255,255,255,0.15)' : 'transparent' }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 16, color: active ? '#E1F5EE' : '#9FE1CB' }} />
              <span style={{ fontSize: 12, color: active ? '#E1F5EE' : '#9FE1CB', fontWeight: active ? 500 : 400 }}>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '0 8px 8px' }}>
        <div style={{ padding: '8px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: '#E1F5EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: TEAL_DARK }}>
            {user?.full_name?.[0]?.toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#E1F5EE' }}>{user?.full_name}</div>
            <div style={{ fontSize: 9, color: '#5DCAA5', textTransform: 'capitalize' }}>{user?.role}</div>
          </div>
        </div>
        <div onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>
          <i className="ti ti-logout" style={{ fontSize: 16, color: '#9FE1CB' }} />
          <span style={{ fontSize: 12, color: '#9FE1CB' }}>Logout</span>
        </div>
      </div>
    </div>
  );
}
