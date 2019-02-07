import React from "react";
import PostIndexItemContainer from "./post_index_item_container";
import NavbarContainer from "../navbar/navbar_container";
import NavbarShort from "../navbar/navbar_short";

class PostIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScrollHeight: null
    };
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      fetchUsers,
      fetchPosts,
      fetchLikes,
      fetchComments
    } = this.props;

    const {
      currentScrollHeight
    } = this.state;
    
    fetchUsers();
    fetchPosts();
    fetchLikes();
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
      posts,
      users,
      likes,
      comments,
      currentUser
    } = this.props;

    let postsList;
    // postsList = posts.filter(post => currentUser.followingIds.includes(post.posterId)).map( (post, idx) => {
    postsList = posts.map( (post, idx) => {
      if (users[post.posterId]) {
        const postComments = comments.filter(comment => post.commentIds.includes(comment.id));
        
        return <PostIndexItemContainer key={idx}
                                       post={post}
                                       user={users[post.posterId]}
                                       likes={likes}
                                       postComments={postComments}
                                       currentUser={currentUser} />
      }
    });

    if (postsList.length === 0) {
      postsList = <article className="temp-post-container"></article>
    };

    let navbar;
    if (currentScrollHeight <= 90) {
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
          {/* <UserIndexContainer /> */}
        </section>
      </>
    )
  }
}

export default PostIndex;