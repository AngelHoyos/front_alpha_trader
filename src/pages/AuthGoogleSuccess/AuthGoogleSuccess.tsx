
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthGoogleSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('googleAuthToken', token); 
      console.log('Token de Google guardado:', token);
      navigate('/dashboard');
    } else {
      console.error('No se recibió el token de Google.');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <p>Autenticando con Google...</p>
    </div>
  );
};

export default AuthGoogleSuccess;