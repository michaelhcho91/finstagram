# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  name            :string
#  email           :string           not null
#  bio             :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :session_token, :email, :password_digest, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  has_one_attached :photo
  has_many :posts, foreign_key: :poster_id, class_name: :Post

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end
  
  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def self.generate_session_token
    SecureRandom::urlsafe_base64(32)
  end
  
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
