import React from "react";
import { timeSince } from "../../util/date_util";
import PostCaption from "../posts/post_caption";
import PostCaptionEdit from "../posts/post_caption_edit";
import { connect } from "react-redux";
import { openEditting, closeEditting, deletePost } from "../../actions/post_actions";
import { createLike, deleteLike } from "../../actions/like_actions";

class PostView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScrollHeight: null
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      deleteLike,
      fetchPost
    } = this.props;

    const myLikes = likes.filter(like => like.liker_id === currentUser.id);
    const currentLike = myLikes.find(like => like.post_id === post.id);

    deleteLike(currentLike);
  }
  
  render() {
    const {
      post,
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

    const likeCount = post.likerIds.length;
    let likeOrLikes = "likes";
    if (likeCount === 1) likeOrLikes = "like";
    
    let heartIcon;
    if (post.likerIds.includes(currentUser.id)) {
      heartIcon = <img onClick={this.unlikePost} className="liked-icon" src={window.liked_icon} />
    } else {
      heartIcon = <img onClick={this.likePost} className="heart-icon" src={window.heart_icon} />
    };
    
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
                  <li>cool post!</li>
                  <li>nice</li>
                  <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem est sunt quia et nihil accusamus magnam tenetur hic id laudantium rem ducimus, repellendus vel? Amet eius numquam libero voluptates rem?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquid deserunt exercitationem ipsum asperiores vero vel quia blanditiis in possimus aperiam a, fuga, et laboriosam nostrum voluptas tempora nisi rem.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nihil repudiandae nam eaque? Delectus perspiciatis ducimus omnis in officiis, iste placeat dignissimos. Enim officia dicta autem odit magni consequatur earum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, eum, esse ipsum, voluptates nobis enim perferendis neque consectetur tenetur minus adipisci repellendus. Culpa aperiam nihil tempora saepe perspiciatis et quibusdam!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, laudantium nesciunt. Illum cupiditate minima similique quidem! Ipsa, nisi quam, dolores consequuntur quasi architecto voluptate vero at voluptatem harum voluptatum error!
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum beatae voluptatibus ea tenetur vel, est eius harum, minima aperiam veniam doloribus vero, neque fugiat rem earum nostrum. Ea, neque tenetur.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima consequatur blanditiis cum error at quos vel totam molestias perspiciatis? Deserunt velit sunt incidunt odio consequatur fuga ullam illo cumque?
                  </li>
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
                <form onSubmit={this.handleSubmit} className="post-view-comment-form">
                  <textarea id={`view-comment-${post.posterId}`} placeholder="Add a comment..."></textarea>
                  <button className="submit-comment-icon" onClick={this.handleSubmit}><img src={window.submit_icon} /></button>
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
    post: state.entities.posts[ownProps.postId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openEditting: (postId) => dispatch(openEditting(postId)),
    closeEditting: () => dispatch(closeEditting()),
    deletePost: (postId) => dispatch(deletePost(postId)),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (like) => dispatch(deleteLike(like))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);