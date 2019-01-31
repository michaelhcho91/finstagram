import React from "react";
import UserIndexItem from "./user_index_item";

class UserIndex extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const {
      users
    } = this.props;
    
    const usersList = users.map( (user, idx) => {
      return <UserIndexItem key={idx} user={user} />
    });

    return (
      <ul>
        {usersList}
      </ul>
    )
  }
}

export default UserIndex;