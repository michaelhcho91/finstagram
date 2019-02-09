import React from "react";
import { Link } from "react-router-dom";

class PostCaption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editClass: "hide-edit"
    };

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

    const {
      editClass
    } = this.state;

    let captionUsername;
    if (user) {
      captionUsername = <Link onClick={this.exitModal} to={user !== currentUser ? `/users/${user.id}` : `/profile`}>
                          {user ? user.username : currentUser.username}
                        </Link>;
    }

    let captionSpan = null;
    if (post.caption) {
      captionSpan = <span className="post-caption-user">{captionUsername} <span className="post-caption">{post.caption}</span></span>
    }
    
    let editButton = null;
    if (post.posterId === currentUser.id) {
      editButton = <button onMouseEnter={() => this.setState({editClass: "show-edit"})}
                           onMouseLeave={() => this.setState({editClass: "hide-edit"})}
                           onClick={this.handleClick}
                           className="caption-edit-icon">
                    <img src={window.edit_icon} />
                  </button>
    }
    
    return (
      <>
        {captionSpan}
        {editButton}
        <span className={editClass}> Edit Caption</span>
      </>
    )
  };
}

export default PostCaption;