import { connect } from "react-redux";
import PostIndex from "./post_index";
import { fetchPosts } from "../../actions/post_actions";
import { fetchUsers } from "../../actions/user_actions";
import { fetchLikes } from "../../actions/like_actions";
import { fetchComments } from "../../actions/comment_actions";

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts).reverse(),
    users: state.entities.users,
    likes: Object.values(state.entities.likes),
    comments: Object.values(state.entities.comments),
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchLikes: () => dispatch(fetchLikes()),
    fetchComments: () => dispatch(fetchComments())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);