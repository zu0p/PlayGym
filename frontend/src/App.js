import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Home } from './features/home/Home';
import { Login } from './features/login/Login'
import './App.css';

function App() {
  return (
    <div className="App">      
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
      </BrowserRouter>
    </div>
  );
}

export default App;
