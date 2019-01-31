# == Schema Information
#
# Table name: comments
#
#  id           :bigint(8)        not null, primary key
#  body         :text             not null
#  commenter_id :integer          not null
#  post_id      :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :commenter, foreign_key: :commenter_id, class_name: :User
  belongs_to :post, foreign_key: :post_id, class_name: :Post
end
