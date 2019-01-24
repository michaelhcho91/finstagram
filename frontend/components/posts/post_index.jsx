import React from "react";
import PostIndexItem from "./post_index_item";

class PostIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const posts = this.props.posts.map( (post, idx) => {
      return <PostIndexItem key={idx} post={post} />
    });

    return (
      <>
        <ul>
          {posts}
          <button onClick={this.props.logout}>Logout</button>
        </ul>  
      </>
    )
  }
}

export default PostIndex;