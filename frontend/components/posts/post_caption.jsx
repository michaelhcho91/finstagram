import React from "react";

class PostCaption extends React.Component {
  render() {
    return (
      <>
        {this.props.post.caption} <button onClick={this.props.openEditting} className="caption-edit-icon"><img src={window.edit_icon}/></button>
      </>
    )
  };
}

export default PostCaption;