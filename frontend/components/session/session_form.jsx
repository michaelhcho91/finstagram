import React from "react";
import { Link, Redirect } from "react-router-dom";
import Footer from "../splash/footer";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  demoLogin(e) {
    e.preventDefault();

    this.props.login({
      username: "demo",
      password: "password"
    });
  }
  
  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.props.processForm(this.state);
  }
  
  render() {
    const { currentUser, formType, errors } = this.props;

    let errorsList;
    if (errors.length !== 0) {
      errorsList = errors.map( (error, idx) => {
        return <li key={idx}>{error}</li>
      })
    }

    let form;
    if (formType === "Log In") {
      const { username, password } = this.state;

      form = <>
              <form className="session-form login" onSubmit={this.handleSubmit}>
                <h1 className="session-h1 login">Finstagram</h1>

                <input required onChange={this.update("username")} type="text" placeholder="Username" value={username} />
                <input onChange={this.update("password")} type="password" placeholder="Password" value={password} />

                <button className="session-button" type="submit" disabled={!username} >{formType}</button>
                <button className="session-button demo" onClick={this.demoLogin}>Demo</button>
                <ul>{errorsList}</ul>
              </form>
              <div className="session-redirect login" >
                <span>Don't have an account? <Link className="session-link" to={`/signup`} >Sign Up</Link></span>
              </div>
            </>
    } else {
      const { email, name, username, password } = this.state;

      form = <>
              <form className="session-form" onSubmit={this.handleSubmit}>
                <h1 className="session-h1">Finstagram</h1>
                <h2>Sign up to see photos from your friends.</h2>

                <input required onChange={this.update("email")} type="text" placeholder="Email" value={email} />
                <input onChange={this.update("name")} type="text" placeholder="Full Name" value={name} />
                <input required onChange={this.update("username")} type="text" placeholder="Username" value={username} />
                <input required onChange={this.update("password")} type="password" placeholder="Password" value={password} />

                <button className="session-button" type="submit" >{formType}</button>
                <button className="session-button demo" onClick={this.demoLogin}>Demo</button>
                <ul>{errorsList}</ul>

                <p>By signing up, you agree to our <strong>Terms</strong>, <strong>Data Policy</strong> and <strong>Cookies Policy</strong>.</p>
              </form>
              <div className="session-redirect signup">
                <span>Have an account? <Link className="session-link" to={`/login`}>Log In</Link></span>
              </div>
            </>
    }
    
    return (
      <>
        <div className="session-container">
          <div className="session-right">
            {form}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default SessionForm;