import * as LikeApiUtil from "../util/like_api_util";

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

const receiveLikes = (likes) => {
  return {
    type: RECEIVE_LIKES,
    likes
  };
};

const receiveLike = (like) => {
  return {
    type: RECEIVE_LIKE,
    like
  };
};

const removeLike = (like) => {
  return {
    type: REMOVE_LIKE,
    like
  };
};

export const fetchLikes = () => (dispatch) => {
  return LikeApiUtil.fetchLikes().
    then((likes) => {
      return dispatch(receiveLikes(likes));
    });
};

export const createLike = (like) => (dispatch) => {
  return LikeApiUtil.createLike(like).
    then((like) => {
      return dispatch(receiveLike(like));
    });
};

export const deleteLike = (like) => (dispatch) => {
  return LikeApiUtil.deleteLike(like).
    then(() => {
      return dispatch(removeLike(like));
    });
};