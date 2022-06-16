import React, { useEffect } from 'react';
import LoginPage from './login';

export default function Index() {
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    console.log('index', token);
    if (token) {
      window.location.href = '/battle';
    }
  }, []);
  return <LoginPage />;
}
