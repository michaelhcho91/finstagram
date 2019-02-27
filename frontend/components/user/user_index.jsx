import React from "react";
import UserIndexItemContainer from "./user_index_item_container";
import { Link } from "react-router-dom";

const UserIndex = ({ users, currentUser }) => {
  const usersList = users.filter(user => currentUser.followingIds.includes(user.id)).map( (user, idx) => {
    return <UserIndexItemContainer key={idx} user={user} />
  });

  return (
    <>
      <section className="user-index-container">
        <div className="user-index-header">
          <aside className="user-index-pic">
            <Link to={`/profile`}>
              <img src={currentUser.photoUrl} />
            </Link>
          </aside>

          <div className="user-index-info">
            <h1>
              <Link to={`/profile`}>
                {currentUser.username}
              </Link>
            </h1>

            <h2>
              {currentUser.name}
            </h2>
          </div>
        </div>

        <div className="index-list-container">
          <span>
            Following
          </span>
          
          <ul className="index-list">
            {usersList}
          </ul>
        </div>
      </section>
    </>
  )
}

export default UserIndex;