import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Login from './views/Login';
import Home from './views/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App(): React.ReactElement {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
