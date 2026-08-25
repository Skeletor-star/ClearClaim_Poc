import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',color:'#0F6E56'}}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role && user.role !== 'admin') return <Navigate to="/" />;
  return children;
}
