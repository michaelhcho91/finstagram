import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createPost } from "../../actions/post_actions";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/post_actions";

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
    this.escToClose = this.escToClose.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();

    document.removeEventListener("keydown", this.escToClose);
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this.escToClose);
  }

  escToClose(e) {
    const {
      closeModal
    } = this.props;
    
    if (e.keyCode === 27) {
      closeModal();
    }
  }
  
  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const {
      caption,
      photoFile
    } = this.state;

    const {
      createPost,
      closeModal,
      history
    } = this.props;
    
    const formData = new FormData();
    formData.append("post[caption]", caption);
    if (photoFile) formData.append("post[photo]", photoFile);

    createPost(formData).
      then(closeModal()).
        then(history.push("/"));
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({
        photoFile: file,
        photoUrl: fileReader.result
      });
    };

    if (file) fileReader.readAsDataURL(file);
  }
  
  render() {
    const {
      photoUrl,
      photoFile
    } = this.state;

    let preview = null;
    if (photoUrl) {
      preview = <img className="post-preview" src={photoUrl} />
    }
    
    return (
      <div className="post-create-container">
        <form className="post-create-form" onSubmit={this.handleSubmit} className="post-create-form">
          <h2 className="post-create-h2">
            Upload a photo!
          </h2>

          <textarea className="post-caption-input" onChange={this.update("caption")} type="text" placeholder="Write a caption..." />
          <input className="post-file-input" id="file-selector" onChange={this.handleFile} type="file" accept="image/*" />

          <label className="post-file-input-label" htmlFor="file-selector">
            Choose File
          </label>

          <button className="post-create-submit" disabled={!photoFile} type="submit">
            Share
          </button>

          {preview}
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(PostCreate));