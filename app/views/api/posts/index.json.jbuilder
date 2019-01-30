@posts.each do |post|
  json.set! post.id do
    json.extract! post, :id, :caption, :created_at
    json.posterId post.poster_id
    json.photoUrl url_for(post.photo)

    if post.likers
      json.likerIds post.likers.pluck(:id)
    else
      json.likerIds []
    end
  end
end