import * as LikeApiUtil from "../util/like_api_util";

export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

const receiveLike = (like) => {
  return {
    type: RECEIVE_LIKE,
    like
  };
};

const removeLike = (likeId) => {
  return {
    type: REMOVE_LIKE,
    likeId
  };
};

export const createLike = (like) => (dispatch) => {
  return LikeApiUtil.createLike(like).
    then((like) => {
      return dispatch(receiveLike(like));
    });
};

export const deleteLike = (likeId) => (dispatch) => {
  return LikeApiUtil.deleteLike(likeId).
    then(() => {
      return dispatch(removeLike(likeId));
    });
};