import React from "react";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.removeComment = this.removeComment.bind(this);
  }
  
  removeComment() {
    const {
      comment,
      currentUser,
      deleteComment
    } = this.props;

    if (comment.commenter_id === currentUser.id) {
      deleteComment(comment);
    }
  }
  
  render() {
    const {
      comment,
      currentUser
    } = this.props;

    let deletable;
    if (comment.commenter_id === currentUser.id) {
      deletable = "deletable";
    } else deletable = "not-deletable";
    
    return(
      <li onClick={this.removeComment}>
        <span className={`${deletable}`}>{comment.username} {comment.body}</span>
      </li>
    )
  }
}

export default Comment;