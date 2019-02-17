import React from "react";
import { Link } from "react-router-dom";

const UserIndexItem = ({ user }) => {
  return (
    <>
      <li className="following-item">
        <Link to={`/users/${user.id}`}>
          <img src={user.photoUrl} />
        </Link>

        <h2>
          <Link to={`/users/${user.id}`}>
            {user.username}
          </Link>
        </h2>
      </li>
    </>
  )
};

export default UserIndexItem;