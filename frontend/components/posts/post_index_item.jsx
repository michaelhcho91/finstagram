import React from "react";
import { Link } from "react-router-dom";

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      commenter_id: this.props.currentUser.id,
      post_id: this.props.post.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();

    this.props.createComment(this.state);
  }

  render() {
    const { user, post } = this.props;

    const postHeader = <>
                        <img className="post-profile-pic" src={user.photoUrl} />
                        <div>{user.username}</div>
                      </>

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
                  <Link to={"/feed"} ><img src={window.heart_icon} /></Link>
                </span>
                <span>
                  <label className="post-comment-icon" htmlFor={`comment-${post.id}`} ><img src={window.comment_icon} /></label>
                </span>
              </section>
              <section className="post-like">like count</section>
            </div>

            <div>
              {post.caption}
              <ul className="post-comments-list">
                <li>comments</li>
                <li>comments</li>
                <li>comments</li>
                <li>comments</li>
              </ul>
            </div>

            <div className="post-time">post created at</div>

            <section className="post-comment-form-container">
              <div>
                <form onSubmit={this.handleSubmit} className="post-comment-form">
                  <textarea id={`comment-${post.id}`} placeholder="Add a comment..."></textarea>
                  <input type="submit" disabled/>
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