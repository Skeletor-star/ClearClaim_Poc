import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const TEAL = '#0F6E56';
const TEAL_DARK = '#085041';
const TEAL_LIGHT = '#E1F5EE';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success('Welcome back!');
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'support') navigate('/support');
      else navigate('/client');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Login failed');
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
          <h1 style={{ fontSize: 20, fontWeight: 600, color: TEAL_DARK }}>Welcome back</h1>
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Sign in to your ClearClaim account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="you@example.com"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, outline: 'none' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 5 }}>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required placeholder="••••••••"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, outline: 'none' }} />
          </div>
          <button type="submit" disabled={loading}
            style={{ width: '100%', background: TEAL, border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 500, color: TEAL_LIGHT, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#6b7280', marginTop: 16 }}>
          Don't have an account? <Link to="/register" style={{ color: TEAL, fontWeight: 500 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
