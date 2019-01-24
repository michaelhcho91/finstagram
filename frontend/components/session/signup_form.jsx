import React from "react";
import { Link } from "react-router-dom";

const SignupForm = (props) => {
  let errors;
  if (props.errors.length !== 0) {
    errors = this.props.errors.map((error, idx) => {
      return <li key={idx}>{error}</li>
    })
  }
  
  return (
    <div className="session-container">
      <img className="session-image" src={window.splashImage} />
      <div className="session-right">
        <form className="session-form" onSubmit={props.handleSubmit}>
          <h1>Finstagram</h1>
          <h2>Sign up to see photos from your friends.</h2>

          <input required onChange={props.update("email")} id="email" type="text" placeholder="Email" value={props.state.email} />
          <input onChange={props.update("name")} id="name" type="text" placeholder="Full Name" value={props.state.name} />
          <input required onChange={props.update("username")} id="username" type="text" placeholder="Username" value={props.state.username} />
          <input required onChange={props.update("password")} id="password" type="password" placeholder="Password" value={props.state.password} />

          <button className="session-button" type="submit" >{props.formType}</button>
          <button className="session-button demo" onClick={props.demoLogin}>Demo</button>
          <ul>{errors}</ul>

          <p>By signing up, you agree to our <strong>Terms</strong>, <strong>Data Policy</strong> and <strong>Cookies Policy</strong>.</p>
        </form>
        <div className="session-redirect">
          <span>Have an account? <Link className="session-link" to={`/login`}>Log In</Link></span>
        </div>
      </div>
    </div>
  )
}

export default SignupForm;