import { useContext } from 'react';
import { Navigate
 } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type Props = {
  children: React.ReactNode;
}

export function ProtectedRoutes({ children }: Props) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return {children};
}