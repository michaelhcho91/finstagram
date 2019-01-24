import React from "react";

const PostIndexItem = ({ post }) => {
  return (
    <li>
      {post.caption}
    </li>
  )
};

export default PostIndexItem;