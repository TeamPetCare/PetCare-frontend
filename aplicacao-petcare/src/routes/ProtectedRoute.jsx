import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Sempre verdadeiro para fins de teste

  useEffect(() => {
    const checkToken = async () => {
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
