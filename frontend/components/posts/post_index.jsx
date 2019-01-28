import React from "react";
import PostIndexItem from "./post_index_item";
import NavbarContainer from "../navbar/navbar_container";
import NavbarShort from "../navbar/navbar_short";
import UserIndexContainer from "../user/user_index_container";

class PostIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentScrollHeight: null };
  }
  
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchUsers();
    this.setState({ currentScrollHeight: window.scrollY });
    
    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY / 50) * 50;
      if (this.state.currentScrollHeight !== newScrollHeight) {
        this.setState({ currentScrollHeight: newScrollHeight });
      }
    };
  }
  
  render() {
    const { posts, users, currentUser, createComment, deletePost, deleteComment } = this.props;
    
    const postsList = posts.map( (post, idx) => {

      return <PostIndexItem key={idx}
                            post={post}
                            user={users[post.posterId]}
                            currentUser={currentUser}
                            createComment={createComment}
                            deletePost={deletePost}
                            deleteComment={deleteComment} />
    });

    let navbar;
    if (this.state.currentScrollHeight <= 90) {
      navbar = <NavbarContainer />
    } else {
      navbar = <NavbarShort />
    }

    return (
      <>
        {navbar}

        <section className="post-index-section">
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