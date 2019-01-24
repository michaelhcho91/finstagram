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
  has_one_attached :photo
  belongs_to :poster, foreign_key: :poster_id, class_name: :User
end
