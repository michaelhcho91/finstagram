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
      link = <div className="session-redirect" >
              <span>Don't have an account? <Link className="session-link" to={`/signup`} >Sign Up</Link></span>
            </div>

      form = <form className="session-form" onSubmit={this.handleSubmit}>
              <h1>Finstagram</h1>

              <input onChange={this.update("username")} id="username" type="text" placeholder="Username" value={this.state.username} />
              <input onChange={this.update("password")} id="password" type="password" placeholder="Password" value={this.state.password} />

              <button className="session-button" type="submit" >{this.props.formType}</button>
              <button className="session-button demo" onClick={this.demoLogin}>Demo</button>
              <ul>{errors}</ul>
            </form>
    } else {
      link = <div className="session-redirect" >
              <span>Have an account? <Link className="session-link" to={`/login`} >Log In</Link></span>
            </div>
            
      form = <form className="session-form" onSubmit={this.handleSubmit}>
                <h1>Finstagram</h1>
                <h2>Sign up to see photos from your friends.</h2>

                <input onChange={this.update("email")} id="email" type="text" placeholder="Email" value={this.state.email} />
                <input onChange={this.update("name")} id="name" type="text" placeholder="Full Name" value={this.state.name} />
                <input onChange={this.update("username")} id="username" type="text" placeholder="Username" value={this.state.username} />
                <input onChange={this.update("password")} id="password" type="password" placeholder="Password" value={this.state.password} />

                <button className="session-button" type="submit" >{this.props.formType}</button>
                <button className="session-button demo" onClick={this.demoLogin}>Demo</button>
                <ul>{errors}</ul>

                <p>By signing up, you agree to our <strong>Terms</strong>, <strong>Data Policy</strong> and <strong>Cookies Policy</strong>.</p>
              </form>
    }
    
    return (
      <>
        <div className="session-container" >
          <div className="session-right" >
            {form}
            {link}
          </div>
        </div>
      </>
    )
  }
}

export default SessionForm;