json.extract! @comment, :id, :body, :commenter_id, :post_id
json.username @comment.commenter.username
json.receiverId @comment.receiver.id