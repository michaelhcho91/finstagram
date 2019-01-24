import React from "react";
import { Redirect } from "react-router-dom";
import Footer from "../splash/footer";
import SignupForm from "../session/signup_form";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", name: "", username: "", password: "", isFormShown: true };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }
  
  componentWillUnmount() {
    this.props.clearErrors();
  }

  demoLogin(event) {
    event.preventDefault();
    this.props.login({
      username: "demo",
      password: "password"
    });
  }

  update(field) {
    return (event) => {
      this.setState({ [field]: event.currentTarget.value });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.processForm(this.state);
  }
  
  render() {
    let errors;
    if (this.props.errors.length !== 0) {
      errors = this.props.errors.map((error, idx) => {
        return <li key={idx}>{error}</li>
      })
    }

    let splash;
    if (this.props.currentUser) {
      splash = <Redirect to={`/feed`} />
    } else {
      splash = <SignupForm 
                  handleSubmit={this.handleSubmit}
                  update={this.update}
                  demoLogin={this.demoLogin}
                  state={this.state}
                  formType={this.props.formType}
                  errors={this.props.errors} />
    }

    return (
      <>
        {splash}
        <Footer />
      </>
    )
  }
}

export default Splash;