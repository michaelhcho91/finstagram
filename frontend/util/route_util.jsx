import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const Auth = ({ component: Component, path, loggedIn, exact }) => {
  return <Route path={path} exact={exact} render={(props) => {
    if (!loggedIn) {
      return <Component {...props} />
    } else {
      return <Redirect to="/" />
    }
  }} />
}

const Protected = ({ component: Component, path, loggedIn, exact }) => {
  return <Route path={path} exact={exact} render={(props) => {
    if (loggedIn) {
      return <Component {...props} />
    } else {
      return <Redirect to="/" />
    }
  }} />
}

const mapStateToProps = state => {
  return { 
    loggedIn: Boolean(state.session.id) 
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));