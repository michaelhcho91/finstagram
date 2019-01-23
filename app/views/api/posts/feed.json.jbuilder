json.posts do
  @posts.each do |post|
    json.extract! post, :id, :poster_id, :image_url, :caption
  end
end