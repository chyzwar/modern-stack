import {
  FC,
  ReactElement,
} from 'react';

import {
  Navigate,
  useLocation,
} from 'react-router-dom';

import useIsAuthenticated from '../hooks/useIsAuthenticated';

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const from = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from }} />;
  }
  return children;
};

export default ProtectedRoute;
