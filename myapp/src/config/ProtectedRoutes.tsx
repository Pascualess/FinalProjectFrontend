import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Authentication } from '../components/Authentication';
import AuthContext from '../context/AuthContext';


//type Props takes in children from React. This will protect the children routes
//this will check if the user is authenticated before showing the protected components/contents
type Props = {
  children: React.ReactNode;
}

//this component uses the useContext hook to get the current user from AuthContext
export function ProtectedRoutes({ children }: Props): JSX.Element {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

//if the user is not authenticated, they will be redirected/navigated back to login page/route
//it will return component Authentication to prompt them to log in.
  if (!user) {
    navigate('/login', { replace: true });
    return <Authentication />;
  }

//once user is authenticated, it will show the protected pages by rendering the children prop
  return <>{children}</>;
}
