class Post < ApplicationRecord
  validates :image_url, presence: true
end