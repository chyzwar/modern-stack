import React, {
  FC,
  ReactElement,
} from 'react';

import {
  Route,
  Redirect,
} from 'react-router-dom';

import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps{
  children: ReactElement;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ path, exact, children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? (
      <Route path={path} exact={exact}>
        {children}
      </Route>
    )
    : (
      <Redirect to={{
        pathname: '/login',
        state: {
          path,
        },
      }}
      />
    );
};

export default ProtectedRoute;
