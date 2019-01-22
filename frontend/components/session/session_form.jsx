import React from "react";
import { Link, Redirect } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "" };
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
    const { currentUser } = this.props;
    if (currentUser) return <Redirect to={`/`} />;

    let errors;
    if (this.props.errors.length !== 0) {
      errors = this.props.errors.map( (error, idx) => {
        return <li key={idx}>{error}</li>
      })
    }

    let link;
    let form;
    if (this.props.formType === "Log In") {
      link = <div>
              <span>Don't have an account? </span>
              <Link to={`/signup`} >Sign Up</Link>
            </div>

      form = <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">Username:
                <input onChange={this.update("username")} name="username" type="text" value={this.state.username} />
              </label>
                <br />
              <label htmlFor="password">Password: 
                <input onChange={this.update("password")} name="password" type="password" value={this.state.password} />
              </label>
                <br />
              <input type="submit" value={this.props.formType} />
              <ul>{errors}</ul>
              <button onClick={this.demoLogin}>Demo</button>
            </form>
    } else {
      link = <div>
              <span>Have an account? </span>
              <Link to={`/login`} >Log In</Link>
            </div>
            
      form = <form onSubmit={this.handleSubmit}>
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
              </form>
    }
    
    return (
      <>
        {form}
        {link}
      </>
    )
  }
}

export default SessionForm;