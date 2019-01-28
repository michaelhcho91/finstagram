@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :username, :name
    
    if user.photo.attached?
      json.photoUrl url_for(user.photo)
    else
      json.photoUrl ""
    end
  end
end