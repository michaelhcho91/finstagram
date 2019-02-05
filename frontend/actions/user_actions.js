import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

const receiveUser = (user) => {
  return {
    type: RECEIVE_USERS,
    user
  };
};

const receiveCurrentUser = (user) => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
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

export const fetchUsers = () => (dispatch) => {
  return UserApiUtil.fetchUsers().
    then(users => {
      return dispatch(receiveUsers(users));
    }
  );
};

export const fetchUser = (userId) => (dispatch) => {
  return UserApiUtil.fetchUser(userId).
    then(user => {
      return dispatch(receiveUser(user));
    });
};

export const updateUser = (user) => (dispatch) => {
  return UserApiUtil.updateUser(user).
    then((user => {
      return dispatch(receiveCurrentUser(user));
    }), (errors => {
      return dispatch(receiveErrors(errors));
    }));
};