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
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deletePost(this.state.post_id);
  }
  
  handleSubmit(e) {
    e.preventDefault();


  }

  render() {
    const { user, post } = this.props;

    let postHeader;
    if (user) {
      postHeader = <>
                    <img className="post-profile-pic" src={user.photoUrl} />
                    <div>{user.username}</div>
                    <button className="delete-icon" onClick={this.handleDelete}><img src={window.delete_icon}/></button>
                  </>
    } else postHeader = null;

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