import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions/post_actions";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors, fetchPosts } from "../../actions/post_actions";

class PostCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: "",
      photoFile: null,
      photoUrl: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }
  
  update(field) {
    return(e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("post[caption]", this.state.caption);
    
    if (this.state.photoFile) {
      formData.append("post[photo]", this.state.photoFile);
    }

    this.props.createPost(formData).then(this.props.closeModal());
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    
    if (file) fileReader.readAsDataURL(file);
  }
  
  render() {
    let preview;
    if (this.state.photoUrl) {
      preview = <img className="post-preview" src={this.state.photoUrl} />
    } else preview = <div className="post-preview"/>
    
    return (
      <div className="post-create-container">
        <form className="post-create-form" onSubmit={this.handleSubmit} className="post-create-form">
          <h2 className="post-create-h2">Upload an image!</h2>
          <input className="post-caption-input" onChange={this.update("caption")} type="text" placeholder="Write a caption..."/>
          <input className="post-file-input" onChange={this.handleFile} type="file"/>
          <button className="post-create-submit" disabled={!this.state.photoFile} type="submit" value="Share" />
        </form>

        {preview}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => dispatch(closeModal()),
    createPost: (post) => dispatch(createPost(post)),
    clearErrors: () => dispatch(clearErrors()),
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(null, mapDispatchToProps)(PostCreate)