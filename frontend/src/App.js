import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Counter } from './features/counter/Counter';
import { Home } from './features/home/Home';
import { Login } from './features/login/Login'
import { Signup } from './features/signup/Signup'
import { Profile } from './features/profile/Profile';
import { Mypage } from './features/mypage/Mypage'
import { FollowMe } from './features/games/followme/FollowMe'
import { Mugunghwa } from './features/games/mugunghwa/Mugunghwa'
import Test from './features/test/test'

function App() {
  return (
    <div className="App">      
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/followme" component={FollowMe} />
        <Route path="/mugunghwa" component={Mugunghwa} />
        <Route path="/test" component={Test} />
      </BrowserRouter>
    </div>
  );
}

export default App;
