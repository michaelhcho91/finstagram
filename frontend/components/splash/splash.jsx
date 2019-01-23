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

    let splash;
    if (this.props.currentUser) {
      splash = <>
                  <h3>{this.props.currentUser.username}</h3>
                  <br/>
                  <h4>{this.props.currentUser.name}</h4>
                  <br/>
                  <button onClick={this.props.logout}>Logout</button>
                </>
    } else {
      splash = <div className="splash-container">
                  <img className="splash-image" src="/assets/images/white-iphone.png" alt=""/>
                  <div className="splash-right">
                    <form className="splash-form" onSubmit={this.handleSubmit}>
                      <h1>Finstagram</h1>
                      <h2>Sign up to see photos from your friends.</h2>

                      <input onChange={this.update("email")} id="email" type="text" placeholder="Email" value={this.state.email} />
                      <br />
                      <input onChange={this.update("name")} id="name" type="text" placeholder="Full Name" value={this.state.name} />
                      <br />
                      <input onChange={this.update("username")} id="username" type="text" placeholder="Username" value={this.state.username} />
                      <br />
                      <input onChange={this.update("password")} id="password" type="password" placeholder="Password" value={this.state.password} />
                      <br />
                      <button className="splash-button" type="submit" >{this.props.formType}</button>
                      <br />
                      <button className="splash-button" onClick={this.demoLogin}>Demo</button>
                      <ul>{errors}</ul>
                        
                      <p>By signing up, you agree to our <strong>Terms, Data Policy</strong> and <strong>Cookies Policy.</strong></p>
                    </form>
                    <div className="splash-redirect">
                      <span>Have an account? </span>
                      <Link onClick={this.dismiss} to={`/login`} >Log In</Link>
                    </div>
                  </div>
                </div>
    }

    return (
      <div>
        {splash}
      </div>
    )
  }
}

export default Splash;