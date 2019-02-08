import React from "react";
import Navbar from "../navbar/navbar";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    const {
      currentUser
    } = this.props;
    
    this.state = {
      name: currentUser.name,
      username: currentUser.username,
      bio: currentUser.bio,
      email: currentUser.email,
      photoFile: null,
      photoUrl: currentUser.photoUrl,
      savedOrNot: "edit-unsaved"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      name,
      username,
      bio,
      email,
      photoFile
    } = this.state;

    const {
      updateUser,
      currentUser
    } = this.props;

    const formData = new FormData();
    formData.append("user[name]", name);
    formData.append("user[username]", username);
    formData.append("user[bio]", bio);
    formData.append("user[email]", email);
    if (photoFile) {
      formData.append("user[photo]", photoFile);
    }
    
    updateUser({
      formData,
      id: currentUser.id
    });

    this.setState({
      savedOrNot: "edit-saved"
    });

    setTimeout(() => {
      this.setState({
        savedOrNot: "edit-unsaved"
      });
    }, 1200);
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
  
  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }
  
  render() {
    const {
      currentUser
    } = this.props;

    const {
      photoUrl,
      savedOrNot
    } = this.state;

    let preview;
    if (photoUrl) {
      preview = <img className="edit-pic-preview" src={photoUrl} />
    } else {
      preview = <img className="current-pic" src={currentUser.photoUrl} />
    };

    return(
      <>
        <Navbar />
      
        <form className="edit-form-container" onSubmit={this.handleSubmit}>
          <div className="edit-pic">
            <aside className="edit-pic-left">
              <label className="file-input-label" htmlFor="file-selector">
                {preview}
              </label>
            </aside>
            <div>
              <h1>{currentUser.username}</h1>
              <label className="file-input-label" htmlFor="file-selector">Change Profile Photo</label>
              <input type="file" onChange={this.handleFile} id="file-selector" />
            </div>
          </div>
        
          <div className="edit-name">
            <aside className="edit-name-left">
              <label htmlFor="name">Name</label>
            </aside>
            <div>
              <input type="text" id="name" onChange={this.update("name")} defaultValue={currentUser.name} />              
            </div>
          </div>

          <div className="edit-username">
            <aside className="edit-username-left">
              <label htmlFor="username">Username</label>
            </aside>
            <div>
              <input type="text" id="username" onChange={this.update("username")} defaultValue={currentUser.username} />
            </div>
          </div>

          <div className="edit-bio">
            <aside className="edit-bio-left">
              <label htmlFor="bio">Bio</label>
            </aside>
            <div>
              <input type="text" id="bio" onChange={this.update("bio")} defaultValue={currentUser.bio} />
            </div>
          </div>

          <div className="edit-private">
            <h2>Private Information</h2>
          </div>

          <div className="edit-email">
            <aside className="edit-email-left">
              <label htmlFor="email">Email</label>
            </aside>
            <div>
              <input type="text" id="email" onChange={this.update("email")} defaultValue={currentUser.email} />
            </div>
          </div>

          <input className="edit-submit" type="submit" value="Submit" /><span className={savedOrNot}>Saved!</span>
        </form>
      </>
    )
  }
}

export default UserEdit;