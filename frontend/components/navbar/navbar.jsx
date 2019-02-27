import React from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../modal/modal_container";

class Navbar extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      container: "nav-tall-container",
      currentScrollHeight: null,
      leftDivider: "nav-divider",
      leftLogo: "nav-logo",
      results: "results-tall",
      search: "nav-search",
      searchValue: "",
      whichNav: "nav-tall"
    };

    this.clearSearch = this.clearSearch.bind(this);
    this.escToClose = this.escToClose.bind(this);
    this.goToUser = this.goToUser.bind(this);
    this.matchUsers = this.matchUsers.bind(this);
    this.transition = this.transition.bind(this);
  }

  componentDidMount() {
    const {
      fetchUsers
    } = this.props;

    fetchUsers();
    
    document.addEventListener("keydown", this.escToClose);

    this.setState({
      currentScrollHeight: window.scrollY
    });

    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY / 50) * 50;

      if (this.state.currentScrollHeight !== newScrollHeight) {
        this.setState({
          currentScrollHeight: newScrollHeight
        });
      }

      this.transition();
    };
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escToClose);
  }

  clearSearch() {
    const input = document.getElementById("search-input");
    input.value = "";
    input.blur();

    this.setState({
      searchValue: ""
    });
  }

  escToClose(e) {
    if (e.keyCode === 27) {
      this.clearSearch();
    }
  }
  
  goToUser(user) {
    const {
      currentUser,
      history
    } = this.props;
    
    this.clearSearch();
    history.push(user !== currentUser ? `/users/${user.id}` : `/profile`);
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
            <li onClick={() => this.goToUser(user)} key={idx} className="search-li">
              <aside className="search-photo-container">
                <img className="search-photo" src={user.photoUrl} />
              </aside>

              <div>
                <p>
                  {user.username}
                </p>

                <span className="search-name">
                  {user.name}
                </span>
              </div>
            </li>
          );
        }
      });
    }

    return searchResults.length === 0 ? null : searchResults;
  }

  transition() {
    if (this.state.currentScrollHeight <= 90) {
      this.setState({
        container: "nav-tall-container",
        leftDivider: "nav-divider",
        leftLogo: "nav-logo",
        results: "results-tall",
        search: "nav-search",
        whichNav: "nav-tall"
      });
    } else {
      this.setState({
        container: "nav-short-container",
        leftDivider: "go-away",
        leftLogo: "go-away",
        results: "results-short",
        search: "nav-search-short",
        whichNav: "nav-short"
      });
    }
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  render() {
    const {
      container,
      leftDivider,
      leftLogo,
      results,
      search,
      searchValue,
      whichNav
    } = this.state;
    
    return (
      <nav className={whichNav}>
        <ModalContainer />

        <div className={container}>
          <ul className="nav-list">
            <li className="nav-left-items">
              <div>
                <Link to={"/feed"} className="icon-feed">
                  <img src={window.feed_icon} />
                </Link>
              </div>

              <div className={leftDivider} />
              
              <div>
                <Link to={"/feed"} className={leftLogo}>
                  Finstagram
                </Link>
              </div>
            </li>
            
            <li className={search}>
              <input id="search-input"
                     onChange={this.update("searchValue")}
                     type="text"
                     placeholder="                    Search" />

              <ul className={results}>
                {this.matchUsers(searchValue)}
              </ul>
            </li>
            
            <li className="nav-right-items">
              <Link to={"/explore"} className="icon-explore">
                <img src={window.explore_icon} />
              </Link>

              <a href="https://github.com/michaelhcho91/finstagram" target="_blank">
                <img className="icon-github" src={window.github_icon} />
              </a>

              <Link to={"/profile"} className="icon-profile">
                <img src={window.profile_icon} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;