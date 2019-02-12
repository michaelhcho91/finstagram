import React from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../modal/modal_container";

class NavbarShort extends React.Component {
  render() {
    return (
      <nav className="nav-container-short">
        <ModalContainer />

        <div className="nav-list-container-short">
          <ul className="nav-list-short">
            <li className="nav-left-items-short">
              <div><Link to={`/feed`} className="icon-feed-short"><img src={window.feed_icon} /></Link></div>
            </li>

            <li className="nav-search-short">
              <input type="text" placeholder="                      Search" />
            </li>

            <li className="nav-right-items-short">
              <Link to={"/explore"} className="icon-explore"><img src={window.explore_icon} /></Link>
              <a href="https://github.com/michaelhcho91/finstagram" target="_blank"><img className="icon-github-short" src={window.github_icon} /></a>
              <Link to={`/profile`} className="icon-profile-short"><img src={window.profile_icon} /></Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavbarShort;