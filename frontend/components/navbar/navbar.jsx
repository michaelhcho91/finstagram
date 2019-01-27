import React from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../modal/modal_container";

class Navbar extends React.Component {  
  render() {
    return (
      <nav className="nav-container">
        <ModalContainer />

        <div className="nav-list-container">
          <ul className="nav-list">
            <li className="nav-left-items">
              <div><Link to={"/"} className="icon-feed"><img src={window.feed_icon}/></Link></div>
              <div className="nav-divider"></div>
              <div><Link to={"/"} className="nav-logo">Finstagram</Link></div>
            </li>
            
            <li className="nav-search">
              <input type="text" placeholder="Search"/>
            </li>
            
            <li className="nav-right-items">
              <Link to={"/"} className="icon-upload"><img onClick={this.props.openModal} src={window.upload_icon}/></Link>
              <Link to={"/"} className="icon-heart"><img src={window.heart_icon}/></Link>
              <Link to={"/profile"} className="icon-profile"><img src={window.profile_icon}/></Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;