import React from "react";
import { Link } from "react-router-dom";

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

    let greeting;
    if (this.props.currentUser) {
      greeting = <>
                  <h3>{this.props.currentUser.username}</h3>
                  <br/>
                  <h4>{this.props.currentUser.name}</h4>
                  <br/>
                  <button onClick={this.props.logout}>Logout</button>
                </>
    } else {
      greeting = <>
                  <form onSubmit={this.handleSubmit}>
                    <span>Sign up to see photos from your friends.</span>
                      <br />
                    <label htmlFor="email">Email:
                      <input onChange={this.update("email")} id="email" type="text" value={this.state.email} />
                    </label>
                      <br />
                    <label htmlFor="name">Name:
                      <input onChange={this.update("name")} id="name" type="text" value={this.state.name} />
                    </label>
                      <br />
                    <label htmlFor="username">Username:
                      <input onChange={this.update("username")} id="username" type="text" value={this.state.username} />
                    </label>
                      <br />
                    <label htmlFor="password">Password:
                      <input onChange={this.update("password")} id="password" type="password" value={this.state.password} />
                    </label>
                      <br />
                    <input type="submit" value={this.props.formType} />
                    <ul>{errors}</ul>
                    <button onClick={this.demoLogin}>Demo</button>
                      <br />
                    <span>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</span>
                  </form>
                    <br />
                  <div>
                    <span>Have an account? </span>
                    <Link onClick={this.dismiss} to={`/login`} >Log In</Link>
                  </div>
                </>
    }

    return (
      <div>
        {greeting}
      </div>
    )
  }
}

export default Splash;