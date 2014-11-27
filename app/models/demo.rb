# == Schema Information
#
# Table name: submissions
#
#  id         :integer          not null, primary key
#  artist_id  :integer          not null
#  title      :string(255)      not null
#  track_info :text
#  thumb_url  :string(255)
#  audio_url  :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Demo < ActiveRecord::Base
  validate :artist_id, :title, presence: true
  after_validation :ensure_avatar
  belongs_to(
    :artist,
    class_name: "User",
    foreign_key: :artist_id,
    primary_key: :id
  )

  def ensure_avatar
    self.thumb_url = artist.avatar_url unless self.thumb_url
  end

end
