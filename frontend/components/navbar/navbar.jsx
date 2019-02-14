import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalContainer from "../modal/modal_container";
import { fetchUsers } from "../../actions/user_actions";

class Navbar extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };

    this.matchUsers = this.matchUsers.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  clearSearch() {
    this.setState({
      searchValue: ""
    });
  }
  
  matchUsers(searchValue) {
    const {
      users
    } = this.props;

    let searchResults = [];
    if (searchValue) {
      users.forEach((user, idx) => {
        if (user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.name.toLowerCase().includes(searchValue.toLowerCase())) {
          searchResults.push(
            <li key={idx} className="search-li">
              <aside className="search-photo-container">
                <img className="search-photo"src={user.photoUrl} />
              </aside>
              <div>
                <Link onClick={this.clearSearch} to={`/users/${user.id}`}>
                  {user.username}
                </Link>
                <span className="search-name">{user.name}</span>
              </div>
            </li>
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
      <nav className="nav-container">
        <ModalContainer />

        <div className="nav-list-container">
          <ul className="nav-list">
            <li className="nav-left-items">
              <div><Link to={"/feed"} className="icon-feed"><img src={window.feed_icon} /></Link></div>
              <div className="nav-divider"></div>
              <div><Link to={"/feed"} className="nav-logo">Finstagram</Link></div>
            </li>
            
            <li className="nav-search">
              <input onChange={this.update("searchValue")} type="text" placeholder="                    Search" />
              <ul className="results-list-container">
                {this.matchUsers(searchValue)}
              </ul>
            </li>
            
            <li className="nav-right-items">
              <Link to={"/explore"} className="icon-explore"><img src={window.explore_icon} /></Link>
              <a href="https://github.com/michaelhcho91/finstagram" target="_blank"><img className="icon-github" src={window.github_icon} /></a>
              <Link to={"/profile"} className="icon-profile"><img src={window.profile_icon} /></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);