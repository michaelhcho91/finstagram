import * as FollowApiUtil from "../util/follow_api_util";

export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";

const receiveFollows = (follows) => {
  return {
    type: RECEIVE_FOLLOWS,
    follows
  };
};

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

export const fetchFollows = () => (dispatch) => {
  return FollowApiUtil.fetchFollows().
    then((follows) => {
      return dispatch(receiveFollows(follows));
    });
};

export const fetchFollow = (followId) => (dispatch) => {
  return FollowApiUtil.fetchFollow(followId).
    then((follow) => {
      return dispatch(receiveFollow(follow));
    });
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