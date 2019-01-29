import React from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../modal/modal_container";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modal_actions";

class NavbarShort extends React.Component {
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
              <Link to={`/`} className="icon-upload-short"><img onClick={this.props.openModal} src={window.upload_icon} /></Link>
              <Link to={`/`} className="icon-heart-short"><img src={window.heart_icon} /></Link>
              <Link to={`/profile`} className="icon-profile-short"><img src={window.profile_icon} /></Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal("create")),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarShort);