import React from 'react';
import './App.css';
import Login from './views/Login'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
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
