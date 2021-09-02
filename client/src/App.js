import React from 'react';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route path='/Login' component={Login}/>
      <Route path='/Signup' component={Signup}/>
      <Route path='/Dashboard' component={Dashboard}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
