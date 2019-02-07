export const fetchFollows = () => {
  return $.ajax({
    method: "GET",
    url: `api/follows`
  });
};

export const fetchFollow = (followId) => {
  return $.ajax({
    method: "GET",
    url: `api/follows/${followId}`
  });
};

export const createFollow = (follow) => {
  return $.ajax({
    method: "POST",
    url: `api/follows`,
    data: { follow }
  });
};

export const deleteFollow = (follow) => {
  return $.ajax({
    method: "DELETE",
    url: `api/follows/${follow.following_id}`
  });
};