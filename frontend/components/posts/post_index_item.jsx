import React from "react";

class PostIndexItem extends React.Component {
  render() {
    const { user, post, deletePost } = this.props;
  
    let postHeader;
    if (user) {
      postHeader = <>
                    <img src={user.photoUrl} />
                    Username: {user.username}
                  </>
    } else postHeader = null;

    return (
      <li>
        <div className="post-container">
          {postHeader}
          <img src={post.photoUrl} />
          Caption: {post.caption}
        </div>
      </li>
    )
  }
};

export default PostIndexItem;