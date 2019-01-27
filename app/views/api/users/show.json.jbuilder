json.extract! @user, :id, :username, :name
json.photoUrl url_for(user.photo)