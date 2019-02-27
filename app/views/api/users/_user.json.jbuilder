json.extract! user, :id, :username, :name, :email, :bio
json.photoUrl url_for(user.photo)

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