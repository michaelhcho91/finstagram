import { connect } from "react-redux";
import PostIndexItem from "./post_index_item";
import { deletePost } from "../../actions/post_actions";
import {
  createLike,
  deleteLike
} from "../../actions/like_actions";
import {
  createComment,
  deleteComment
} from "../../actions/comment_actions";
import {
  createFollow,
  deleteFollow
} from "../../actions/follow_actions";

const mapStateToProps = (state) => {
  return {
    captionEditting: state.ui.captionEditting,
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (comment) => dispatch(createComment(comment)),
    createFollow: (follow) => dispatch(createFollow(follow)),
    createLike: (like) => dispatch(createLike(like)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    deleteFollow: (followingId) => dispatch(deleteFollow(followingId)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    deletePost: (postId) => dispatch(deletePost(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndexItem);