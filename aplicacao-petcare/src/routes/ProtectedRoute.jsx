import React, { useEffect, useState } from 'react';
import tokenService from '../services/tokenService';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
        console.log("ENTREI AQUI")
      const validToken = await tokenService.verifyToken();
      setIsAuthenticated(validToken);
    };
    
    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/dono-petshop/login" replace />;
  }

  return children;
};

export default ProtectedRoute;