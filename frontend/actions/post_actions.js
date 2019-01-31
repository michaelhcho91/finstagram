import * as PostApiUtil from "../util/post_api_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const OPEN_EDITTING = "OPEN_EDITTING";
export const CLOSE_EDITTING = "CLOSE_EDITTING";

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

export const openEditting = (postId) => {
  return {
    type: OPEN_EDITTING,
    postId
  };
};

export const closeEditting = () => {
  return {
    type: CLOSE_EDITTING
  };
};

export const fetchPosts = () => (dispatch) => {
  return PostApiUtil.fetchPosts().
    then((posts => {
      return dispatch(receivePosts(posts));
    }), (errors => {
      return dispatch(receiveErrors(errors));
    }));
};

export const fetchPost = (postId) => (dispatch) => {
  debugger
  return PostApiUtil.fetchPost(postId).
    then((post => {
      debugger
      return dispatch(receivePost(post));
    }), (errors => {
      return dispatch(receiveErrors(errors));
    }));
};

export const createPost = (post) => (dispatch) => {
  return PostApiUtil.createPost(post).
    then((post => {
      return dispatch(receivePost(post));
    }), (errors => {
      return dispatch(receiveErrors(errors));
    }));
};

export const updatePost = (post) => (dispatch) => {
  return PostApiUtil.updatePost(post).
    then((post => {
      return dispatch(receivePost(post));
    }), (errors => {
      return dispatch(receiveErrors(errors));
    }));
};

export const deletePost = (postId) => (dispatch) => {
  return PostApiUtil.deletePost(postId).
    then(() => {
      return dispatch(removePost(postId));
    });
};