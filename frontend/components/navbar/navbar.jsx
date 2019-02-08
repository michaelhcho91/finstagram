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
              <div><Link to={"/feed"} className="icon-feed"><img src={window.feed_icon}/></Link></div>
              <div className="nav-divider"></div>
              <div><Link to={"/feed"} className="nav-logo">Finstagram</Link></div>
            </li>
            
            <li className="nav-search">
              <input type="text" placeholder="Search"/>
            </li>
            
            <li className="nav-right-items">
              <Link to={"/explore"} className="icon-explore"><img src={window.explore_icon}/></Link>
              <img className="icon-heart" src={window.heart_icon}/>
              <Link to={"/profile"} className="icon-profile"><img src={window.profile_icon}/></Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;