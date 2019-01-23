import React from "react";
import { Link } from "react-router-dom";
import Footer from "../splash/footer";

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
      const posts = this.props.currentUser.posts.map( (post, idx) => {
        return <img src={post.photoUrl} key={idx} />
      })
      splash = <>
                  <h4>Welcome, {this.props.currentUser.name}</h4>
                  <h3>Logged in as {this.props.currentUser.username}</h3>
                  {/* {posts} */}
                  <button onClick={this.props.logout}>Logout</button>
                </>
    } else {
      splash = <div className="session-container">
                  <img className="session-image" src={window.splashImage} />
                  <div className="session-right">
                    <form className="session-form" onSubmit={this.handleSubmit}>
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
                    <div className="session-redirect">
                      <span>Have an account? <Link className="session-link" to={`/login`}>Log In</Link></span>
                    </div>
                  </div>
                </div>
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