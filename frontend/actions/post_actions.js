import * as PostApiUtil from "../util/post_api_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

const receivePost = (post) => {
  return {
    type: RECEIVE_POST,
    post
  };
};

const removePost = (postId) => {
  return {
    type: REMOVE_POST,
    postId
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const fetchPosts = () => (dispatch) => {
  return PostApiUtil.fetchPosts().
    then((posts => dispatch(receivePosts(posts))),
      (errors => dispatch(receiveErrors(errors))));
};

export const createPost = (post) => (dispatch) => {
  return PostApiUtil.createPost(post).
    then((post => dispatch(receivePost(post))),
      (errors => dispatch(receiveErrors(errors))));
};

export const updatePost = (post) => (dispatch) => {
  return PostApiUtil.updatePost(post).
    then((post => dispatch(receivePost(post))),
      (errors => dispatch(receiveErrors(errors))));
};

export const deletePost = (postId) => (dispatch) => {
  return PostApiUtil.deletePost(postId).
    then(() => dispatch(removePost(postId)));
};