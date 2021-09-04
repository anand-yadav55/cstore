import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(actions.checkAuth());
  });
  return (
    <div>
      <div className="App">
        <BrowserRouter>
          <Route
            path="/Login"
            component={Login}
          />
          <Route path="/Signup" component={Signup} />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/"
            exact
            component={Dashboard}
          />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
