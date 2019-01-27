json.extract! @post, :id, :caption, :created_at
json.posterId @post.poster_id
json.photoUrl url_for(@post.photo)
json.likerIds @post.likers.pluck(:id)

json.comments do
  @post.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :post_id, :commenter_id, :created_at
    end
  end
end