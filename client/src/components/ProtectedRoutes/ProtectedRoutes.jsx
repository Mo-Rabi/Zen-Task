import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import styles from './ProtectedRoutes.module.css'

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (token) {
    return children;
  }
  return <h1>Please login to get a token</h1>;
}
