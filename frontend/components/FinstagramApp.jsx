import React from "react";
import {
  Route,
  Switch
} from "react-router-dom";
import {
  AuthRoute,
  ProtectedRoute
} from "../util/route_util";
import SplashContainer from "./splash/splash_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import PostIndexContainer from "./posts/post_index_container";
import UserProfileContainer from "./user/user_profile_container";
import UserEditContainer from "./user/user_edit_container";
import PostExploreContainer from "./posts/post_explore";
import Footer from "./splash/footer";

const App = () => {
  return (
    <>
      <div className="master-container" >
        <Switch>
          <AuthRoute path="/login" component={LoginFormContainer} />
          <AuthRoute path="/signup" component={SignupFormContainer} />
          <ProtectedRoute path="/feed" component={PostIndexContainer} />
          <ProtectedRoute path="/explore" component={PostExploreContainer} />
          <ProtectedRoute path="/profile/edit" component={UserEditContainer} />
          <ProtectedRoute path="/profile" component={UserProfileContainer} />
          <ProtectedRoute path="/users/:userId" component={UserProfileContainer} />
          <Route path="/" component={SplashContainer} />
        </Switch>
      </div>
      
      <Footer />
    </>
  )
}

export default App;