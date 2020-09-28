/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PersonRegistration from '../components/PersonRegistration/PersonRegistration';
import Login from '../components/Login/Login';
import PersonList from '../components/PersonList/PersonList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentUser, logout } from '../services/user.service';
import "./App.css";
export default function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    logout();
  };
    return(
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Register External user</Link></li>
            {currentUser ? (<li><Link to={'/login'} onClick={logOut} className="nav-link">Logout</Link></li>): (<li><Link to={'/login'} className="nav-link">Login</Link></li>)}
            {currentUser && (<li><Link to={'/admin'} className="nav-link">External users</Link></li>)}
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
