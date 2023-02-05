import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ListUsers from './pages/ListUsers';
import NewResult from './pages/NewResult';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
    return (
        <ToastProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component ={Home} />
              <Route path="/login" exact component ={Login} />
              <PrivateRoute path="/register" exact component ={Register} />
              <PrivateRoute path="/users" exact component ={ListUsers} />
              <PrivateRoute path="/profile" exact component ={Profile} />
              <PrivateRoute path="/results/new" exact component ={NewResult} />
              <PrivateRoute path="/dashboard" exact component ={Dashboard} />
              <Route component={ NotFound } />
            </Switch>
          </BrowserRouter>      
        </ToastProvider>
    )
}

export default Routes;