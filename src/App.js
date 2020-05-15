
import React from 'react';
import logo from './logo.svg';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Dasboard from './admin/Dasboard';
import Logout from './admin/Logout';
import Profile from './admin/Profile';
import Setting from './admin/Setting';
import Errorpage from './Errorpage';

function App() {
    return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/admin" exact component={Admin} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/admin/dashboard" exact component={Dasboard}/>
      <Route path="/admin/profile" exact component={Profile}/>
      <Route path="/admin/setting" exact component={Setting}/>
      <Route exact component={Errorpage}/>
    </BrowserRouter>
  );
}



export default App;
