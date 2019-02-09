import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/post_actions";
import { fetchUsers } from "../../actions/user_actions";
import { fetchComments } from "../../actions/comment_actions";
import PostIndexItemContainer from "./post_index_item_container";
import Navbar from "../navbar/navbar";
import NavbarShort from "../navbar/navbar_short";

class PostExplore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScrollHeight: null
    };
  }

  componentDidMount() {
    const {
      fetchPosts,
      fetchUsers,
      fetchComments
    } = this.props;

    const {
      currentScrollHeight
    } = this.state;
    
    fetchUsers();
    fetchPosts();
    fetchComments();

    this.setState({
      currentScrollHeight: window.scrollY
    });

    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY / 50) * 50;
      if (currentScrollHeight !== newScrollHeight) {
        this.setState({
          currentScrollHeight: newScrollHeight
        });
      }
    };
  }
  
  render() {
    const {
      currentScrollHeight
    } = this.state;

    const {
      users,
      posts,
      comments,
      currentUser
    } = this.props;

    let explorePosts = posts.filter(post => !currentUser.followingIds.includes(post.posterId) && currentUser.id !== post.posterId).map( (post, idx) => {
      if (users[post.posterId]) {
        const postComments = comments.filter(comment => post.commentIds.includes(comment.id));

        return <PostIndexItemContainer key={idx}
                                       post={post}
                                       user={users[post.posterId]}
                                       postComments={postComments}
                                       currentUser={currentUser} />
      }
    });

    if (explorePosts.length === 0) {
      explorePosts = <article className="temp-explore-container" />
    }
    
    let navbar;
    if (currentScrollHeight <= 90) {
      navbar = <Navbar />
    } else {
      navbar = <NavbarShort />
    }
    
    return (
      <>
        {navbar}
      
        <section className="explore-container">
          <h2 className="explore-text">Explore</h2>
          <ul className="posts-list">
            {explorePosts}
          </ul>
        </section>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts).reverse(),
    users: state.entities.users,
    comments: Object.values(state.entities.comments),
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchComments: () => dispatch(fetchComments())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostExplore);