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