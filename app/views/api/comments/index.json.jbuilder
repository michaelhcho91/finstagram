@comments.each do |comment|
  json.extract! comment, :id, :body, :commenter_id, :post_id, :created_at
  json.username comment.commenter.username
  json.receiverId comment.receiver.id
end