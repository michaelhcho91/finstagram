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

    this.props.updatePost(merge({}, this.props.post, this.state)).
      then(this.props.closeEditting()).
      then(this.props.closeModal());
  }
  
  render() {
    return (
      <>
        <form className="caption-edit-form" onSubmit={this.handleSubmit}>
          <input className="caption-edit-input" onChange={this.update("caption")} value={this.state.caption} />
          <button className="caption-edit-submit"><img src={window.submit_icon}/></button>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (post) => dispatch(updatePost(post)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(null, mapDispatchToProps)(PostCaptionEdit);