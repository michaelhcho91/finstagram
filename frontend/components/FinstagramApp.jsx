import React from "react";
import { Route, Switch } from "react-router-dom";
import SplashContainer from "./splash/splash_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import { AuthRoute } from "../util/route_util";

const App = () => {
  return (
    <div>
      <header>
        <h1>Finstagram</h1>
      </header>

      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <Route path="/" component={SplashContainer} />
      </Switch>
    </div>
  )
}

export default App;