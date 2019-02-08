import React from "react";
import { Link } from "react-router-dom";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.removeComment = this.removeComment.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
  
  handleClick() {
    this.props.closeModal();
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
      <li>
        <span className="comment-username">
          <Link onClick={this.handleClick} to={comment.username !== currentUser.username ? `/users/${comment.commenter_id}` : `/profile`}>
            {comment.username} 
          </Link>
          <span onClick={this.removeComment} className={`comment-body ${deletable}`}> {comment.body}</span>
        </span>
      </li>
    )
  }
}

export default Comment;