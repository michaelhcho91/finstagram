import React from "react";
import { Link } from "react-router-dom";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteClass: "hide-delete"
    };
    
    this.removeComment = this.removeComment.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteOrNot = this.deleteOrNot.bind(this);
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

  deleteOrNot() {
    const {
      currentUser,
      comment
    } = this.props;
    
    if (currentUser.id === comment.commenter_id) {
      this.setState({
        deleteClass: "show-delete"
      });
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

    const {
      deleteClass
    } = this.state;

    let deletable;
    if (comment.commenter_id === currentUser.id) {
      deletable = "deletable";
    } else deletable = "not-deletable";
    
    return(
      <>
        <li>
          <span className="comment-username">
            <Link onClick={this.handleClick} to={comment.username !== currentUser.username ? `/users/${comment.commenter_id}` : `/profile`}>
              {comment.username} 
            </Link>
            <span 
              onMouseEnter={this.deleteOrNot}
              onMouseLeave={() => this.setState({deleteClass: "hide-delete"})}
              onClick={this.removeComment}
              className={`comment-body ${deletable}`}> {comment.body}
            </span>
            <span className={deleteClass}> Delete</span>
          </span>
        </li>
      </>
    )
  }
}

export default Comment;