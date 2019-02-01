import React from "react";
import { timeSince } from "../../util/date_util";
import PostCaption from "../posts/post_caption";
import PostCaptionEdit from "../posts/post_caption_edit";
import CommentContainer from "../comments/comment_container";
import { connect } from "react-redux";
import { openEditting, closeEditting, deletePost } from "../../actions/post_actions";
import { createLike, deleteLike } from "../../actions/like_actions";
import { createComment, deleteComment } from "../../actions/comment_actions";

class PostView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      commenter_id: this.props.currentUser.id,
      post_id: this.props.post.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
  }
  
  handleDelete() {
    const {
      deletePost,
      post,
      closeModal
    } = this.props;
    
    deletePost(post.id).then(closeModal());
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const {
      createComment,
      post
    } = this.props;

    createComment(this.state);
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
      post,
      currentUser,
      createLike
    } = this.props;

    createLike({
      post_id: post.id,
      liker_id: currentUser.id
    });
  }

  unlikePost() {
    const {
      post,
      likes,
      currentUser,
      deleteLike
    } = this.props;

    const myLikes = likes.filter(like => like.liker_id === currentUser.id);
    const currentLike = myLikes.find(like => like.post_id === post.id);

    deleteLike(currentLike);
  }
  
  render() {
    const {
      post,
      comments,
      currentUser,
      captionEditting,
      closeEditting,
      openEditting
    } = this.props;
    
    const createdAt = timeSince(post.created_at);

    let postCaption;
    if (captionEditting === post.id) {
      postCaption = <PostCaptionEdit post={post} closeEditting={closeEditting} />
    } else {
      postCaption = <PostCaption currentUser={currentUser} post={post} openEditting={openEditting} />
    }

    let postHeader;
    if (currentUser) {
      postHeader = <>
        <img className="post-view-profile-pic" src={currentUser.photoUrl} />
        <div>{currentUser.username}</div>
      </>
    } else postHeader = null;

    let deleteButton;
    if (post.posterId === currentUser.id) {
      deleteButton = <button className="view-delete-icon" onClick={this.handleDelete}><img src={window.delete_icon} /></button>
    } else deleteButton = null;

    let likeCount = post.likerIds.length;
    let likeOrLikes = "likes";
    if (likeCount === 1) likeOrLikes = "like";
    if (likeCount === 0) {
      likeCount = <span>
                    Be the first to <span onClick={this.likePost} className="like-this">like this</span>
                  </span>;
      likeOrLikes = null;
    }
    
    let heartIcon;
    if (post.likerIds.includes(currentUser.id)) {
      heartIcon = <img onClick={this.unlikePost} className="liked-icon" src={window.liked_icon} />
    } else {
      heartIcon = <img onClick={this.likePost} className="heart-icon" src={window.heart_icon} />
    };
    
    const postComments = comments.filter(comment => post.commentIds.includes(comment.id));
    const commentsList = postComments.map((comment, idx) => {
      return <CommentContainer key={idx} commentId={comment.id} />
    })
    
    const {
      body
    } = this.state;
    
    return(
      <>
        <article className="post-view-container">
          <section className="photo-side">
            <div className="photo-space">
              <img src={post.photoUrl}/>
            </div>
          </section>

          <section className="post-view-right">
            <header className="post-view-header">
              {postHeader}
            </header>

            <div className="post-view-below-header">
              <div className="post-view-space">
                {postCaption}
                <ul className="post-view-comments-list">
                  {commentsList}
                </ul>
              </div>

              <div>
                <section className="post-view-icon-container">
                  <span>
                    {heartIcon}
                  </span>
                  <span>
                    <label className="post-view-comment-icon" htmlFor={`view-comment-${post.posterId}`} ><img src={window.comment_icon} /></label>
                  </span>
                  <span>
                    {deleteButton}
                  </span>
                </section>
                <section className="post-likes">{likeCount} {likeOrLikes}</section>
              </div>
            </div>

            <div className="post-view-time">{createdAt}</div>

            <section className="post-view-comment-form-container">
              <div>
                <form onSubmit={this.handleSubmit} className="post-view-comment-form" id={`comment-form-${post.id}`}>
                  <input onChange={this.update("body")} id={`view-comment-${post.posterId}`} placeholder="Add a comment..."></input>
                  <button className="submit-comment-icon" onClick={this.handleSubmit} disabled={!body}><img src={window.submit_icon} /></button>
                </form>
              </div>
            </section>
          </section>
        </article>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    captionEditting: state.ui.captionEditting,
    likes: Object.values(state.entities.likes),
    post: state.entities.posts[ownProps.postId],
    comments: Object.values(state.entities.comments)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openEditting: (postId) => dispatch(openEditting(postId)),
    closeEditting: () => dispatch(closeEditting()),
    deletePost: (postId) => dispatch(deletePost(postId)),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (like) => dispatch(deleteLike(like)),
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);