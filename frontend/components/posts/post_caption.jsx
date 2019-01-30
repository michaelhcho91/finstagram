import React from "react";

class PostCaption extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    const {
      openEditting,
      post
    } = this.props;
    
    openEditting(post.id);
  }
  
  render() {
    const {
      currentUser,
      post,
      user
    } = this.props;

    let captionUsername;
    if (user) {
      captionUsername = user.username;
    } else {
      captionUsername = currentUser.username;
    }
    
    let editButton;
    if (post.posterId === currentUser.id) {
      editButton = <button onClick={this.handleClick} className="caption-edit-icon"><img src={window.edit_icon} /></button>
    } else editButton = null;
    return (
      <>
        <span>{captionUsername} {post.caption}</span>
        {editButton}
      </>
    )
  };
}

export default PostCaption;