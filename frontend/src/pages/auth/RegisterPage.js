import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const TEAL = '#0F6E56';
const TEAL_DARK = '#085041';
const TEAL_LIGHT = '#E1F5EE';

export default function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(form.full_name, form.email, form.password);
      toast.success('Account created!');
      navigate('/client');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ width: 380, background: '#fff', borderRadius: 16, padding: 36, border: '1px solid #e5e7eb', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, background: TEAL, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <i className="ti ti-shield-check" style={{ fontSize: 22, color: TEAL_LIGHT }} />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: TEAL_DARK }}>Create your account</h1>
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Start filing smarter claims today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {[{ key: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Rahul Sharma' },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' }
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>{f.label}</label>
              <input value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                type={f.type} required placeholder={f.placeholder}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          <button type="submit" disabled={loading} style={{ width: '100%', background: TEAL, border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 500, color: TEAL_LIGHT, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 6 }}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#6b7280', marginTop: 16 }}>
          Already have an account? <Link to="/login" style={{ color: TEAL, fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
