import React from "react";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bio: "",
      email: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();


  }
  
  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <input type="submit"/>
        </form>
      </>
    )
  }
}

export default UserEdit;