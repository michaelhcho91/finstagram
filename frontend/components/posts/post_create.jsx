import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions/post_actions";
import { closeModal } from "../../actions/modal_actions";

class PostCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = { caption: "", photoFile: null };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }
  
  update(field) {
    return(event) => {
      this.setState({ [field]: event.currentTarget.value });
    };
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("post[caption]", this.state.caption);
    formData.append("post[photo]", this.state.photoFile);

    this.props.createPost(formData).then(this.props.closeModal);
  }

  handleFile(event) {
    this.setState({ photoFile: event.currentTarget.files[0] });
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="post-create-form">
        <input onChange={this.handleFile} type="file"/>
        <input onChange={this.update("caption")} type="text" placeholder="Caption"/>
        <input type="submit" value="Create Post" />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => dispatch(closeModal()),
    createPost: (post) => dispatch(createPost(post))
  };
};

export default connect(null, mapDispatchToProps)(PostCreate)