import React from "react";
import UserIndexItem from "./user_index_item";
import { Link } from "react-router-dom";

class UserIndex extends React.Component {
  render() {
    const {
      users,
      currentUser
    } = this.props;
    
    const usersList = users.filter(user => currentUser.followingIds.includes(user.id)).map( (user, idx) => {
      return <UserIndexItem key={idx} user={user} />
    });

    return (
      <>
        <section className="user-index-container">
          <div className="user-index-header">
            <aside className="user-index-pic">
              <img src={currentUser.photoUrl} />
            </aside>
            <div className="user-index-info">
              <h1><Link to={`/profile`}>{currentUser.username}</Link></h1>
              <h2>{currentUser.name}</h2>
            </div>
          </div>
        
          <ul className="following-list">
            <span>Following</span>
            {usersList}
          </ul>
        </section>
      </>
    )
  }
}

export default UserIndex;