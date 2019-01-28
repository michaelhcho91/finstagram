# == Schema Information
#
# Table name: posts
#
#  id         :bigint(8)        not null, primary key
#  poster_id  :integer          not null
#  caption    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord
  # validate :ensure_photo

  has_one_attached :photo
  belongs_to :poster, foreign_key: :poster_id, class_name: :User
  has_many :comments, foreign_key: :post_id, class_name: :Comment
  has_many :likes, foreign_key: :post_id, class_name: :Like
  has_many :likers, through: :likes, source: :liker

  # def ensure_photo
  #   unless self.photo.attached?
  #     errors[:photo] << "must be attached."
  #   end
  # end
end
