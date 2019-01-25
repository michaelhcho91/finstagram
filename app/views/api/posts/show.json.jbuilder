json.extract! @post, :id, :caption, :created_at
json.posterId @post.poster_id

if @post.photo.attached?
  json.photoUrl url_for(@post.photo)
end