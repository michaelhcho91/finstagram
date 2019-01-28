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
      poster_id: this.props.currentUser.id,
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

    const { caption, photoFile } = this.state;
    const { createPost, closeModal } = this.props;
    
    const formData = new FormData();
    formData.append("post[caption]", caption);
    if (photoFile) formData.append("post[photo]", photoFile);

    createPost(formData).then(closeModal());
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
    const { photoUrl, photoFile } = this.state;
    
    let preview;
    if (photoUrl) {
      preview = <img className="post-preview" src={photoUrl} />
    } else preview = <div className="post-preview"/>
    
    return (
      <div className="post-create-container">
        <form className="post-create-form" onSubmit={this.handleSubmit} className="post-create-form">
          <h2 className="post-create-h2">Upload an image!</h2>
          <textarea className="post-caption-input" onChange={this.update("caption")} type="text" placeholder="Write a caption..."/>
          <input className="post-file-input" id="file-selector" onChange={this.handleFile} type="file"/>
          <label className="post-file-input-label" htmlFor="file-selector">Choose File</label>
          <button className="post-create-submit" disabled={!photoFile} type="submit">Share</button>
        </form>

        {preview}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors()),
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate)