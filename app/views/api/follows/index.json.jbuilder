@follows.each do |follow|
  json.set! follow.following_id do
    json.extract! follow, :id, :follower_id, :following_id
  end
end