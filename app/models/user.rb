# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#  username        :string(255)
#  avatar_url      :string(255)      default("default_avatar.png")
#

class User < ActiveRecord::Base
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }

  after_initialize :ensure_session_token

  has_many(
    :demos,
    class_name: "Demo",
    foreign_key: :artist_id,
    primary_key: :id
  )

  has_many :playlists
  has_many :artist_follows
  has_many :artists, through: :artist_follows, source: :artist
  has_many :stream_demos, through: :artists, source: :demos
  has_many :followers, through: :artist_follows, source: :user


  def self.find_by_credentials(user_params)
    user = nil

    if (is_email?(user_params[:email]))
      user = User.find_by_email(user_params[:email])
    else
      user = User.find_by_username(user_params[:email])
    end

    user.try(:is_password?, user_params[:password]) ? user : nil
  end

  def self.is_email?(str)
    !!str.match(/\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i)
  end

  def password=(raw_password)
    self.password_digest = BCrypt::Password.create(raw_password)
  end

  def is_password?(password)
    self.password_digest.is_password?(password)
  end

  def password_digest
    BCrypt::Password.new(super)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end



  def generate_session_token
    new_token = SecureRandom.urlsafe_base64
    new_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

end
