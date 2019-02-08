import React from "react";
import { Link } from "react-router-dom";

class PostCaption extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.exitModal = this.exitModal.bind(this);
  }
  
  handleClick() {
    const {
      openEditting,
      post
    } = this.props;
    
    openEditting(post.id);
  }
  
  exitModal() {
    this.props.closeModal();
  }
  
  render() {
    const {
      currentUser,
      post,
      user
    } = this.props;

    let captionUsername;
    if (user) {
      captionUsername = <Link onClick={this.exitModal} to={user !== currentUser ? `/users/${user.id}` : `/profile`}>
                          {user ? user.username : currentUser.username}
                        </Link>;
    }

    let captionSpan;
    if (post.caption) {
      captionSpan = <span className="post-caption-user">{captionUsername} <span className="post-caption">{post.caption}</span></span>
    } else captionSpan = null;
    
    let editButton;
    if (post.posterId === currentUser.id) {
      editButton = <button onClick={this.handleClick} className="caption-edit-icon"><img src={window.edit_icon} /></button>
    } else editButton = null;
    
    return (
      <>
        {captionSpan}
        {editButton}
      </>
    )
  };
}

export default PostCaption;