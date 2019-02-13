import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalContainer from "../modal/modal_container";
import { fetchUsers } from "../../actions/user_actions";

class NavbarShort extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };

    this.matchUsers = this.matchUsers.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  update(field) {
    console.log(this.state);
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  matchUsers(searchValue) {
    const {
      users
    } = this.props;

    let searchResults = [];
    if (searchValue) {
      users.forEach((user, idx) => {
        if (user.username.toLowerCase().includes(searchValue.toLowerCase())) {
          searchResults.push(
            <li key={idx} className="search-li"><Link to={`users/${user.id}`}>{user.username}</Link></li>
          );
        }
      });
    }

    if (searchResults.length === 0) return null;
    return searchResults;
  }
  
  render() {
    const {
      searchValue
    } = this.state;

    return (
      <nav className="nav-container-short">
        <ModalContainer />

        <div className="nav-list-container-short">
          <ul className="nav-list-short">
            <li className="nav-left-items-short">
              <div><Link to={`/feed`} className="icon-feed-short"><img src={window.feed_icon} /></Link></div>
            </li>

            <li className="nav-search-short">
              <input type="text" placeholder="                      Search" />
              {this.matchUsers(searchValue)}
            </li>

            <li className="nav-right-items-short">
              <Link to={"/explore"} className="icon-explore"><img src={window.explore_icon} /></Link>
              <a href="https://github.com/michaelhcho91/finstagram" target="_blank"><img className="icon-github-short" src={window.github_icon} /></a>
              <Link to={`/profile`} className="icon-profile-short"><img src={window.profile_icon} /></Link>
            </li>
          </ul>
        </div>
      </nav>
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
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarShort);