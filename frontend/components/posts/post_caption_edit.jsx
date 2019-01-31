import { connect } from "react-redux";
import React from "react";
import { updatePost } from "../../actions/post_actions";
import { closeModal } from "../../actions/modal_actions";
import { merge } from "lodash";

class PostCaptionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: this.props.post.caption
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      updatePost,
      post,
      closeEditting
    } = this.props;

    updatePost(merge({}, post, this.state)).
      then(closeEditting());
  }
  
  render() {
    const { caption } = this.state;
    
    return (
      <>
        <form className="caption-edit-form" onSubmit={this.handleSubmit}>
          <input className="caption-edit-input" onChange={this.update("caption")} value={caption} />
          <button className="caption-edit-submit"><img src={window.submit_icon}/></button>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (post) => dispatch(updatePost(post))
  };
};

export default connect(null, mapDispatchToProps)(PostCaptionEdit);