import React from "react";
import { timeSince } from "../../util/date_util";
import PostCaption from "./post_caption";
import PostCaptionEdit from "./post_caption_edit";

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      commenter_id: this.props.currentUser.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
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
  }
  
  unlikePost() {
    const {
      deleteLike,
      post,
      likes,
      currentUser
    } = this.props;

    const myLikes = likes.filter(like => like.liker_id === currentUser.id);
    const currentLike = myLikes.find(like => like.post_id === post.id);

    deleteLike(currentLike);
  }
  
  render() {
    const {
      user,
      post,
      currentUser,
      captionEditting,
      closeEditting,
      openEditting
    } = this.props;

    const createdAt = timeSince(post.created_at);

    let postCaption;

    if (captionEditting === post.id) {
      postCaption = <PostCaptionEdit post={post} user={user} closeEditting={closeEditting} />
    } else {
      postCaption = <PostCaption user={user} currentUser={currentUser} post={post} openEditting={openEditting}/>
    }
    
    let postHeader;
    if (user) {
      postHeader = <>
                    <img className="post-profile-pic" src={user.photoUrl} />
                    <div>{user.username}</div>
                  </>
    } else postHeader = null;

    let deleteButton;
    if (post.posterId === currentUser.id) {
      deleteButton = <button className="delete-icon" onClick={this.handleDelete}><img src={window.delete_icon} /></button>
    } else deleteButton = null;

    const likeCount = post.likerIds.length;
    let likeOrLikes = "likes";
    if (likeCount === 1) likeOrLikes = "like";
    
    let heartIcon;
    if (post.likerIds.includes(currentUser.id)) {
      heartIcon = <img onClick={this.unlikePost} className="liked-icon" src={window.liked_icon} />
    } else {
      heartIcon = <img onClick={this.likePost} className="heart-icon" src={window.heart_icon} />
    };
    
    return (
      <li>
        <article className="post-container">
          <header className="post-header">
            {postHeader}
          </header>

          <div className="post-photo">
            <img src={post.photoUrl} />
          </div>

          <div className="below-photo">
            <div>
              <section className="post-icon-container">
                <span>
                  {heartIcon}
                </span>
                <span>
                  <label className="post-comment-icon" htmlFor={`comment-${post.id}`} ><img src={window.comment_icon} /></label>
                </span>
                <span>
                  {deleteButton}
                </span>
              </section>
              <section className="post-likes">{likeCount} {likeOrLikes}</section>
            </div>

            <div>
              {postCaption}
              <ul className="post-comments-list">
                <li>cool post!</li>
                <li>nice</li>
              </ul>
            </div>

            <div className="post-time">{createdAt}</div>

            <section className="post-comment-form-container">
              <div>
                <form onSubmit={this.handleSubmit} className="post-comment-form">
                  <textarea id={`comment-${post.id}`} placeholder="Add a comment..."></textarea>
                  <button className="submit-comment-icon" onClick={this.handleSubmit}><img src={window.submit_icon}/></button>
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