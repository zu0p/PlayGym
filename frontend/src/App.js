import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Counter } from './features/counter/Counter';
import { Home } from './features/home/Home';
import { Login } from './features/login/Login'
import { Profile } from './features/profile/Profile';

function App() {
  return (
    <div className="App">      
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
    </div>
  );
}

export default App;
