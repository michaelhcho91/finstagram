import React from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../modal/modal_container";

class NavbarShort extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <nav className="nav-container-short">
        <ModalContainer />

        <div className="nav-list-container-short">
          <ul className="nav-list-short">
            <li className="nav-left-items-short">
              <div><Link to={`/`} className="icon-feed-short"><img src={window.feed_icon} /></Link></div>
            </li>

            <li className="nav-search-short">
              <input type="text" placeholder="Search" />
            </li>

            <li className="nav-right-items-short">
              <Link to={"/explore"} className="icon-explore"><img src={window.explore_icon} /></Link>
              <img className="icon-heart-short" src={window.heart_icon} />
              <Link to={`/profile`} className="icon-profile-short"><img src={window.profile_icon} /></Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavbarShort;