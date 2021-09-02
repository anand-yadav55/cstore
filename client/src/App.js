import React from 'react';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <div className="App">
      <Dashboard />
      <Login />
      <Signup />
    </div>
  );
}

export default App;
