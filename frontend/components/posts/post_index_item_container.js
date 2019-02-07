import { connect } from "react-redux";
import PostIndexItem from "./post_index_item";
import { deletePost, openEditting, closeEditting } from "../../actions/post_actions";
import { createLike, deleteLike } from "../../actions/like_actions";
import { createComment, deleteComment } from "../../actions/comment_actions";
import { createFollow, deleteFollow } from "../../actions/follow_actions";

const mapStateToProps = (state) => {
  return {
    captionEditting: state.ui.captionEditting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (postId) => dispatch(deletePost(postId)),
    openEditting: (postId) => dispatch(openEditting(postId)),
    closeEditting: () => dispatch(closeEditting()),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    createFollow: (follow) => dispatch(createFollow(follow)),
    deleteFollow: (followingId) => dispatch(deleteFollow(followingId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndexItem);