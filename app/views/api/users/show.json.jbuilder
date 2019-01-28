json.extract! @user, :id, :username, :name
if @user.photo.attached?
  json.photoUrl url_for(@user.photo)
else
  json.photoUrl ""
end