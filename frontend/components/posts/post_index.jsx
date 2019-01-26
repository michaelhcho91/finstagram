import React from "react";
import PostIndexItem from "./post_index_item";
import NavbarContainer from "../navbar/navbar_container";
import UserIndexContainer from "../user/user_index_container";

class PostIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchUsers();
  }

  render() {
    const { posts, users, logout } = this.props;
    
    const postsList = posts.map( (post, idx) => {
      return <PostIndexItem key={idx} 
                            post={post} 
                            user={users[post.posterId]} />
    });

    return (
      <>
        <NavbarContainer />

        <section className="post-index-section">
          <button onClick={logout}>Logout</button>
          <div className="posts-list-left">
            <ul className="posts-list">
              {postsList}
            </ul>  
          </div>
        </section>
      </>
    )
  }
}

export default PostIndex;