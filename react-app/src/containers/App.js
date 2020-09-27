/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Component,useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import classes from './App.css';
import PersonRegistration from '../components/PersonRegistration/PersonRegistration';
import Login from '../components/Login/Login';
import PersonList from '../components/PersonList/PersonList';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  let state = {
    authenticated: false,
  }
    return(
      <Router>
        <div>
          <h2>Hello!</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Register </Link></li>
            <li><Link to={'/login'} className="nav-link">Login</Link></li>
            <li><Link to={'/admin'} className="nav-link">External users</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={PersonRegistration} />
              <Route path='/login' component={Login} />
              <Route path='/admin' component={PersonList} />
          </Switch>
        </div>
      </Router>
    );
}
