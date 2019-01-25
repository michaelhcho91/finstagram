import React from "react";

const UserIndexItem = ({ user }) => {
  return (
    <li>
      {user.username}
      <img src={user.photoUrl} />
    </li>
  )
};

export default UserIndexItem;