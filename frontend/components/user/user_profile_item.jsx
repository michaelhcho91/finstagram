import React from "react";

class UserProfileItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      post,
      openModal,
      thisUser
    } = this.props;
    
    openModal("postView", {
      post,
      thisUser
    });
  }

  render() {
    const { post } = this.props;
    return(
      <li className="user-post"><img onClick={this.handleClick} src={post.photoUrl} /></li>
    )
  }
}

export default UserProfileItem;