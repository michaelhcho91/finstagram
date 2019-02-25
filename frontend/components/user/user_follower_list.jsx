import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import UserIndexItemContainer from "../user/user_index_item_container";

class FollowerList extends React.Component {
  constructor(props) {
    super(props);

    this.escToClose = this.escToClose.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escToClose);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escToClose);
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
      users,
      thisUser
    } = this.props;

    const followers = users.filter(user => thisUser.followerIds.includes(user.id)).map((user, idx) => {
      return <UserIndexItemContainer className="modal-item" key={idx} user={user} />;
    });

    return (
      <>
        <div className="following-list">
          <section>
            <h1>Followers</h1>
          </section>

          <section>
            <ul className="following-list-list">
              {followers}
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

export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);