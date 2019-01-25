import React from "react";

// const PostIndexItem = ({ post, user }) => {
//   let userHeader;
//   if (user) {
//     userHeader = <>
//                   <img src={user.photoUrl} />
//                   Username: {user.username}
//                 </>
//   } else userHeader = null;

//   return (
//     <li>
//       <div className="post-container">
//         {userHeader}
//         <img src={post.photoUrl} />
//         Caption: {post.caption}
//       </div>
//     </li>
//   )
// };

class PostIndexItem extends React.Component {
  render() {
    const { user, post } = this.props;
  
    let userHeader;
    if (user) {
      userHeader = <>
        <img src={user.photoUrl} />
        Username: {user.username}
      </>
    } else userHeader = null;
    
    return (
      <li>
        <div className="post-container">
          {userHeader}
          <img src={post.photoUrl} />
          Caption: {post.caption}
        </div>
      </li>
    )
  }
};

export default PostIndexItem;