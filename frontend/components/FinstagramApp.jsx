import React from "react";
import { Route, Switch } from "react-router-dom";
import SplashContainer from "./splash/splash_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import PostIndexContainer from "./posts/post_index_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

const App = () => {
  return (
    <div className="master-container" >
      <header>

      </header>

      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <ProtectedRoute path="/feed" component={PostIndexContainer} />
        <Route path="/" component={SplashContainer} />
      </Switch>
    </div>
  )
}

export default App;