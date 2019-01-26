import React from "react";

const UserIndexItem = ({ user }) => {
  return (
    <li>
      <img src={user.photoUrl} />
      {user.username}
    </li>
  )
};

export default UserIndexItem;