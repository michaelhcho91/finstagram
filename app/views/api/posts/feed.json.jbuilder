@posts.each do |post|
  json.set! post.id do
    json.extract! post, :id, :caption, :created_at
    json.posterId post.poster_id
    # json.photoUrl url_for(post.photo)
  end
end