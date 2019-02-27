import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";

class UserProfileItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      openModal,
      post,
      thisUser
    } = this.props;
    
    openModal("postView", {
      post,
      thisUser
    });
  }

  render() {
    const {
      post
    } = this.props;
    
    return(
      <>
        <li className="user-post">
          <img onClick={this.handleClick} src={post.photoUrl} />
        </li>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (type, options) => dispatch(openModal(type, options))
  };
};

export default connect(null, mapDispatchToProps)(UserProfileItem);