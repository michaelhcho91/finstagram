import * as FollowApiUtil from "../util/follow_api_util";

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";

const receiveFollow = (follow) => {
  return {
    type: RECEIVE_FOLLOW,
    follow
  };
};

const removeFollow = (followId) => {
  return {
    type: REMOVE_FOLLOW,
    followId
  };
};

export const createFollow = (follow) => (dispatch) => {
  return FollowApiUtil.createFollow(follow).
    then((follow) => {
      return dispatch(receiveFollow(follow));
    });
};

export const deleteFollow = (followId) => (dispatch) => {
  return FollowApiUtil.deleteFollow(followId).
    then(() => {
      return dispatch(removeFollow(followId));
    });
};