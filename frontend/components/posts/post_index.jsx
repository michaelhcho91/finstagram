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
    const posts = this.props.posts.map( (post, idx) => {
      return <PostIndexItem key={idx} post={post} user={this.props.users[post.posterId]} />
    });

    return (
      <>
        <NavbarContainer />

        <section className="post-index-section">
          <div className="posts-list-left">
            <ul className="posts-list">
              {posts}
            </ul>  
          </div>
        </section>

        {/* <section className="user-index-section">
          <div className="users-list-right">
            <UserIndexContainer />
            <button onClick={this.props.logout}>Logout</button>
          </div>
        </section> */}
      </>
    )
  }
}

export default PostIndex;