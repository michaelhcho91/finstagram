import * as FollowApiUtil from "../util/follow_api_util";

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";

const receiveFollow = (follow) => {
  return {
    type: RECEIVE_FOLLOW,
    follow
  };
};

const removeFollow = (follow) => {
  return {
    type: REMOVE_FOLLOW,
    follow
  };
};

export const createFollow = (follow) => (dispatch) => {
  return FollowApiUtil.createFollow(follow).
    then((follow) => {
      return dispatch(receiveFollow(follow));
    });
};

export const deleteFollow = (follow) => (dispatch) => {
  return FollowApiUtil.deleteFollow(follow).
    then(() => {
      return dispatch(removeFollow(follow));
    });
};