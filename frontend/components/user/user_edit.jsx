import React from "react";
import Navbar from "../navbar/navbar";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      bio: "",
      email: "",
      photoFile: null,
      photoUrl: null
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
      history
    } = this.props;

    const formData = new FormData();
    formData.append("user[name]", name);
    formData.append("user[username]", username);
    formData.append("user[bio]", bio);
    formData.append("user[email]", email);
    if (photoFile) formData.append("user[photo]", photoFile);

    updateUser(formData).
      then(history.push("/profile"));
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
      photoUrl
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
            <aside className="profile-pic-view">
              {preview}
            </aside>
            <div>
              <h1>{currentUser.username}</h1>
              <label className="file-input-label" htmlFor="file-selector">Change Profile Photo</label>
              <input type="file" onChange={this.handleFile} id="file-selector" />
            </div>
          </div>
        
          <div className="edit-name">
            <aside>
              <label htmlFor="name">Name</label>
            </aside>
            <div>
              <input type="text" id="name" onChange={this.update("name")} value={currentUser.name} />              
            </div>
          </div>

          <div className="edit-username">
            <aside>
              <label htmlFor="username">Username</label>
            </aside>
            <div>
              <input type="text" id="username" onChange={this.update("username")} value={currentUser.username} />
            </div>
          </div>

          <div className="edit-bio">
            <aside>
              <label htmlFor="bio">Bio</label>
            </aside>
            <div>
              <input type="text" id="bio" onChange={this.update("bio")} value={currentUser.bio} />
            </div>
          </div>

          <div className="edit-email">
            <aside>
              <label htmlFor="email">Email</label>
            </aside>
            <div>
              <input type="text" id="email" onChange={this.update("email")} value={currentUser.email} />
            </div>
          </div>

          <input type="submit" value="Submit" disabled/>
        </form>
      </>
    )
  }
}

export default UserEdit;