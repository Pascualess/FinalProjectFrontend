import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    
    if (!user) {
      return <Navigate to="/home" replace />;
    }
  return children;
  };

  export default ProtectedRoutes;