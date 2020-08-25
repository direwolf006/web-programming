import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoggedInRoute = ({ component: Component, loggedIn}) => {

  return (
    <Route render={
      () => {
        if (loggedIn!==null) {
          return <Component />
        } else {
          return <Redirect to={{pathname: '/'}}/>
        }
      }
    } />
  )
}

export default LoggedInRoute;