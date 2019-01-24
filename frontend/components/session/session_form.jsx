import React from "react";
import { Link, Redirect } from "react-router-dom";
import Footer from "../splash/footer";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", name: "", username: "", password: "" };
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

    let form;
    if (this.props.formType === "Log In") {
      form = <div className="session-container">
              <div className="session-right">
                <form className="session-form" onSubmit={this.handleSubmit}>
                  <h1>Finstagram</h1>

                  <input required onChange={this.update("username")} type="text" placeholder="Username" value={this.state.username} />
                  <input onChange={this.update("password")} type="password" placeholder="Password" value={this.state.password} />

                  <button className="session-button" type="submit" disabled={!this.state.username} >{this.props.formType}</button>
                  <button className="session-button demo" onClick={this.demoLogin}>Demo</button>
                  <ul>{errors}</ul>
                </form>
                <div className="session-redirect login" >
                  <span>Don't have an account? <Link className="session-link" to={`/signup`} >Sign Up</Link></span>
                </div>
              </div>
            </div>
    } else {
      form = <div className="session-container">
              <div className="session-right">
                <form className="session-form" onSubmit={this.handleSubmit}>
                  <h1>Finstagram</h1>
                  <h2>Sign up to see photos from your friends.</h2>

                  <input required onChange={this.update("email")} type="text" placeholder="Email" value={this.state.email} />
                  <input onChange={this.update("name")} type="text" placeholder="Full Name" value={this.state.name} />
                  <input required onChange={this.update("username")} type="text" placeholder="Username" value={this.state.username} />
                  <input required onChange={this.update("password")} type="password" placeholder="Password" value={this.state.password} />

                  <button className="session-button" type="submit" >{this.props.formType}</button>
                  <button className="session-button demo" onClick={this.demoLogin}>Demo</button>
                  <ul>{errors}</ul>

                  <p>By signing up, you agree to our <strong>Terms</strong>, <strong>Data Policy</strong> and <strong>Cookies Policy</strong>.</p>
                </form>
                <div className="session-redirect signup">
                  <span>Have an account? <Link className="session-link" to={`/login`}>Log In</Link></span>
                </div>
              </div>
            </div>
    }
    
    return (
      <>
        {form}
        <Footer />
      </>
    )
  }
}

export default SessionForm;