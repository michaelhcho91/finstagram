import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import UserIndexItemContainer from "../user/user_index_item_container";

class FollowingList extends React.Component {
  constructor(props) {
    super(props);

    this.escToClose = this.escToClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escToClose);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escToClose);
  }

  escToClose(e) {
    const {
      closeModal
    } = this.props;

    if (e.keyCode === 27) {
      closeModal();
    }
  }
  
  render() {
    const {
      thisUser,
      users
    } = this.props;

    const following = users.filter(user => thisUser.followingIds.includes(user.id)).map( (user, idx) => {
      return <UserIndexItemContainer className="modal-item" key={idx} user={user} />;
    });

    return (
      <>
        <div className="following-list">
          <section>
            <h1>Following</h1>
          </section>

          <section className="following-list-list">
            <ul>
              {following}
            </ul>
          </section>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.entities.users)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);