class PlaylistLink < ActiveRecord::Base
  validates :playlist_id, :demo_id, presence: true
  belongs_to :playlist
  belongs_to :demo

end
