import React from "react";
import { Link } from "react-router-dom";

class UserIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      closeModal
    } = this.props;
    
    closeModal();
  }
  
  render() {
    const {
      user,
      currentUser
    } = this.props;

    return (
      <>
        <li className="following-item">
          <div className="following-item-pic">
            <Link onClick={this.handleClick} to={user !== currentUser ? `/users/${user.id}` : `/profile`}>
              <img src={user.photoUrl} />
            </Link>
          </div>
  
          <div className="user-name">
            <h2>
              <Link onClick={this.handleClick} to={user !== currentUser ? `/users/${user.id}` : `/profile`}>
                {user.username}
              </Link>
            </h2>
            
            <h3>
              {user.name}
            </h3>
          </div>
        </li>
      </>
    )
  }
}

export default UserIndexItem;