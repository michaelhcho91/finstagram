import React from "react";

class PostCaption extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.openEditting(this.props.post.id);
  }
  
  render() {
    let editButton;

    if (this.props.post.posterId === this.props.currentUser.id) {
      editButton = <button onClick={this.handleClick} className="caption-edit-icon"><img src={window.edit_icon} /></button>
    } else editButton = null;
    return (
      <>
        {this.props.post.caption}
        {editButton}
      </>
    )
  };
}

export default PostCaption;