import React from "react";
import { timeSince } from "../../util/date_util";
import PostCaption from "./post_caption";
import PostCaptionEdit from "./post_caption_edit";
import CommentContainer from "../comments/comment_container";
import { Link } from "react-router-dom";

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      likeHeart: "like-heart-none"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
    this.doubleClick = this.doubleClick.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }

  handleDelete() {
    const {
      deletePost,
      post
    } = this.props;

    deletePost(post.id);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const {
      createComment,
      post,
      currentUser
    } = this.props;

    createComment({
      body: this.state.body,
      commenter_id: currentUser.id,
      post_id: post.id
    });
    this.setState({
      body: ""
    });

    const form = document.getElementById(`comment-form-${post.id}`);
    form.reset();
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  likePost() {
    const {
      createLike,
      post,
      currentUser
    } = this.props;

    createLike({
      post_id: post.id,
      liker_id: currentUser.id
    });

    this.setState({
      likeHeart: "like-heart-display"
    });

    setTimeout(() => {
      this.setState({
        likeHeart: "like-heart-none"
      });
    }, 1200);
  }
  
  unlikePost() {
    const {
      deleteLike,
      post,
      currentUser
    } = this.props;

    deleteLike({
      post_id: post.id,
      liker_id: currentUser.id
    });
  }

  doubleClick() {
    const {
      post,
      currentUser
    } = this.props;

    if (post.likerIds.includes(currentUser.id)) {
      return this.unlikePost();
    } else {
      return this.likePost();
    }
  }

  followUser() {
    const {
      createFollow,
      user,
      currentUser
    } = this.props;

    createFollow({
      following_id: user.id,
      follower_id: currentUser.id
    });
  }

  unfollowUser() {
    const {
      deleteFollow,
      user,
      currentUser
    } = this.props;

    deleteFollow({
      following_id: user.id,
      follower_id: currentUser.id
    });
  }

  render() {
    const {
      user,
      post,
      postComments,
      currentUser,
      captionEditting,
      closeEditting,
      openEditting,
      closeModal
    } = this.props;

    const createdAt = timeSince(post.created_at);
    
    const postHeader = <>
      <Link to={user !== currentUser ? `/users/${user.id}` : `/profile`} >
        <img className="post-profile-pic" src={user.photoUrl} />
      </Link>
      
      <Link to={user !== currentUser ? `/users/${user.id}` : `/profile`} >
        <span className="profile-link">{user.username}</span>
      </Link>
    </>

    let followButton;
    if (currentUser && user) {
      if (currentUser.followingIds.includes(user.id)) {
        followButton = <button className="follow-button" onClick={this.unfollowUser}>Following</button>
      } else if (user === currentUser) {
        followButton = null
      } else {
        followButton = <button className="follow-button" onClick={this.followUser}>Follow</button>
      }
    }

    let postCaption;
    if (captionEditting === post.id) {
      postCaption = <PostCaptionEdit post={post}
                                     user={user}
                                     closeEditting={closeEditting} />
    } else {
      postCaption = <PostCaption user={user}
                                 currentUser={currentUser} 
                                 post={post} 
                                 openEditting={openEditting} 
                                 closeModal={closeModal} />
    }

    let deleteButton = null;
    if (post.posterId === currentUser.id) {
      deleteButton = <button className="delete-icon" onClick={this.handleDelete}>
        <img src={window.delete_icon} />
      </button>
    }

    let likeCount = post.likerIds.length;
    let likeOrLikes = likeCount === 1 ? "like" : "likes";
    if (likeCount === 0) {
      likeOrLikes = null;
      likeCount = <span>
                    Be the first to <span onClick={this.likePost} className="like-this">like this</span>
                  </span>;
    }
    
    let heartIcon;
    if (post.likerIds.includes(currentUser.id)) {
      heartIcon = <img onClick={this.unlikePost} className="liked-icon" src={window.liked_icon} />
    } else {
      heartIcon = <img onClick={this.likePost} className="heart-icon" src={window.heart_icon} />
    };
    
    const commentsList = postComments.map((comment, idx) => {
      return <CommentContainer key={idx} commentId={comment.id} />
    })
    
    const {
      body
    } = this.state;
    
    return (
      <li>
        <article className="post-container">
          <header className="post-header">
            {postHeader} {followButton}
          </header>

          <div className="post-photo">
            <img className={this.state.likeHeart} src={window.like_heart_icon} />
            <img className="post-photo-img" onDoubleClick={this.doubleClick} src={post.photoUrl} />
          </div>

          <div className="below-photo">
            <div>
              <section className="post-icon-container">
                <span>
                  {heartIcon}
                </span>
                
                <span>
                  <label className="post-comment-icon" htmlFor={`comment-${post.id}`} >
                    <img src={window.comment_icon} />
                  </label>
                </span>

                <span>
                  {deleteButton}
                </span>
              </section>

              <section className="post-likes">
                {likeCount} {likeOrLikes}
              </section>
            </div>

            <div>
              {postCaption}

              <ul className="post-comments-list">
                {commentsList}
              </ul>
            </div>

            <div className="post-time">{createdAt}</div>

            <section className="post-comment-form-container">
              <div>
                <form onSubmit={this.handleSubmit} className="post-comment-form" id={`comment-form-${post.id}`}>
                  <input onChange={this.update("body")} id={`comment-${post.id}`} placeholder="Add a comment..." />
                  <button className="submit-comment-icon" onClick={this.handleSubmit} disabled={!body}>
                    <img src={window.submit_icon} />
                  </button>
                </form>
              </div>
            </section>
          </div>
        </article>
      </li>
    )
  }
};

export default PostIndexItem;