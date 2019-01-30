import React from "react";
import PostIndexItem from "./post_index_item";
import NavbarContainer from "../navbar/navbar_container";
import NavbarShort from "../navbar/navbar_short";

class PostIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentScrollHeight: null };
  }
  
  componentDidMount() {
    const {
      fetchUsers,
      fetchPosts
    } = this.props;
    const { currentScrollHeight } = this.state;
    
    window.scrollTo(0, 0);
    fetchUsers();
    fetchPosts();
    this.setState({ currentScrollHeight: window.scrollY });
    
    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY / 50) * 50;
      if (currentScrollHeight !== newScrollHeight) {
        this.setState({ currentScrollHeight: newScrollHeight });
      }
    };
  }
  
  render() {
    const { currentScrollHeight } = this.state;
    const {
      posts,
      users,
      currentUser,
      createComment,
      deletePost,
      deleteComment,
      openEditting,
      closeEditting,
      captionEditting
    } = this.props;

    let postsList;
    postsList = posts.map( (post, idx) => {
      return <PostIndexItem key={idx}
                            post={post}
                            user={users[post.posterId]}
                            currentUser={currentUser}
                            createComment={createComment}
                            deletePost={deletePost}
                            deleteComment={deleteComment}
                            openEditting={openEditting}
                            closeEditting={closeEditting}
                            captionEditting={captionEditting} />
    });

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
        </section>
      </>
    )
  }
}

export default PostIndex;