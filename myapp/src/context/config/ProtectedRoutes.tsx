import React from 'react';
import { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Authentication } from '../components/Authentication';
import AuthContext from '../context/AuthContext';


type Props = {
  children: React.ReactNode;
}

export function ProtectedRoutes({ children }: Props): JSX.Element {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login', { replace: true });
    return <Authentication />;
  }

  return <>{children}</>;
}
