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

class Submission < ActiveRecord::Base
  validate :artist_id, :title, presence: true

  belongs_to(
    :artist,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )
  
end
