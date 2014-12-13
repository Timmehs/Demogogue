class Playlist < ActiveRecord::Base
  validates :title, :user_id, presence: true

  belongs_to :user
  has_many :playlist_links
  has_many :demos, through: :playlist_links
end
