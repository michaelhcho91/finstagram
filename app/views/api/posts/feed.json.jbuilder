@posts.each do |post|
  json.set! post.id do
    json.extract! post, :id, :caption, :poster_id
    # json.photo_url url_for(post.photo)
  end
end