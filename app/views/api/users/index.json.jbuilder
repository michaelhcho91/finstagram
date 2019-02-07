@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :username, :name
    
    if user.photo.attached?
      json.photoUrl url_for(user.photo)
    else
      json.photoUrl ""
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
  end
end