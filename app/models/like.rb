# == Schema Information
#
# Table name: likes
#
#  id         :bigint(8)        not null, primary key
#  liker_id   :integer          not null
#  post_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ApplicationRecord
  belongs_to :liker, foreign_key: :liker_id, class_name: :User
  belongs_to :post, foreign_key: :post_id, class_name: :Post
  has_one :receiver, through: :post, source: :poster
end
