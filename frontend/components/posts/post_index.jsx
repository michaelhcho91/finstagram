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
      fetchPosts,
      fetchLikes
    } = this.props;
    const { currentScrollHeight } = this.state;
    
    window.scrollTo(0, 0);
    fetchUsers();
    fetchPosts();
    fetchLikes();
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
      likes,
      currentUser,
      deletePost,
      openEditting,
      closeEditting,
      captionEditting,
      createLike,
      deleteLike
    } = this.props;

    let postsList;
    postsList = posts.map( (post, idx) => {
      if (users[post.posterId]) {
        return <PostIndexItem key={idx}
                              post={post}
                              user={users[post.posterId]}
                              likes={likes}
                              currentUser={currentUser}
                              deletePost={deletePost}
                              openEditting={openEditting}
                              closeEditting={closeEditting}
                              captionEditting={captionEditting}
                              createLike={createLike}
                              deleteLike={deleteLike} />
      } else return null;
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