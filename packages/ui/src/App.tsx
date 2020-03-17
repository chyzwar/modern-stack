import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './views/Login';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
