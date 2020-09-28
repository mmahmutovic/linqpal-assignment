/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PersonRegistration from '../components/PersonRegistration/PersonRegistration';
import Login from '../components/Login/Login';
import PersonList from '../components/PersonList/PersonList';
import ListItem from '@material-ui/core/ListItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentUser, logout } from '../services/user.service';
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
            <ListItem button>
              {currentUser ? (<Link to={'/login'} onClick={logOut} className="nav-link">Logout</Link>): (<Link to={'/login'} className="nav-link">Login</Link>)}
            </ListItem>
            <ListItem button><Link to={'/'} className="nav-link"> Register External user</Link></ListItem>
            <ListItem button> {currentUser && (<Link to={'/admin'} className="nav-link">External users</Link>)}</ListItem>         
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
