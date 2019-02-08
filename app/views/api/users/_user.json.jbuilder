json.extract! user, :id, :username, :name, :email, :bio

if user.photo.attached?
  json.photoUrl url_for(user.photo)
end

if user.followers
  json.followerIds user.followers.pluck(:id)
else
  json.followerIds []
end

if user.following
  json.followingIds user.following.pluck(:id)
else
  json.followingIds []
end