import React from "react";
import { Link } from "react-router-dom";

const UserIndexItem = ({ user }) => {
  return (
    <>
      <li className="following-item">
        <img src={user.photoUrl} />
        <h2><Link to={`/users/${user.id}`}>{user.username}</Link></h2>
      </li>
    </>
  )
};

export default UserIndexItem;