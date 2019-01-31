@likes.each do |like|
  json.set! like.id do
    json.extract! like, :id, :liker_id, :post_id
    json.receiverId like.receiver.id
  end
end