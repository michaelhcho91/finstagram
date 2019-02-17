import React from "react";
import { Link, Redirect } from "react-router-dom";
import ModalContainer from "../modal/modal_container";

class Navbar extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      whichNav: "nav-tall",
      container: "nav-tall-container",
      leftLogo: "nav-logo",
      leftDivider: "nav-divider",
      search: "nav-search",
      results: "results-tall",
      currentScrollHeight: null
    };

    this.matchUsers = this.matchUsers.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.transition = this.transition.bind(this);
    this.goToUser = this.goToUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();

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

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        e.preventDefault();
        document.getElementById("search-input").blur();
        this.clearSearch();
      }
    });
  }
  
  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  clearSearch() {
    const input = document.getElementById("search-input");
    input.value = "";
    
    this.setState({
      searchValue: ""
    });
  }
  
  goToUser(user) {
    this.clearSearch();
    this.props.history.push(`/users/${user.id}`);
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
        whichNav: "nav-tall",
        container: "nav-tall-container",
        leftLogo: "nav-logo",
        leftDivider: "nav-divider",
        search: "nav-search",
        results: "results-tall"
      });
    } else {
      this.setState({
        whichNav: "nav-short",
        container: "nav-short-container",
        leftLogo: "go-away",
        leftDivider: "go-away",
        search: "nav-search-short",
        results: "results-short"
      });
    }
  }
  
  render() {
    const {
      searchValue,
      whichNav,
      container,
      leftLogo,
      leftDivider,
      search,
      results
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
                    //  onBlur={this.clearSearch}
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