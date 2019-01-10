import React, { Component } from 'react';
import './App.css';
import User from './user';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import Users from './users';
import NewUser from './newUser'


class App extends Component {
  render() {
   return(
    <Router>
    <Switch>
    <Route path='/users' exact component={Users}/>
    <Route path='/' exact component={NewUser}/>
    <Route path='/chat/:name' component={User}/>
    </Switch>
    </Router>
   )
  }
}

export default App;
