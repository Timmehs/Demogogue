# == Schema Information
#
# Table name: demos
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
  attr_reader :created_at
  belongs_to(
    :artist,
    class_name: "User",
    foreign_key: :artist_id,
    primary_key: :id
  )

  def ensure_avatar
    self.thumb_url = "assets/cassette.jpg" unless self.thumb_url
  end
  
  GENRES =
  "Alternative Rock
  Ambient
  Classical
  Country
  Dance
  Deep House
  Disco
  Drum & Bass
  Dubstep
  Electronic
  Folk
  Hardcore Techno
  Hip Hop
  House
  Indie Rock
  Jazz
  Latin
  Metal
  Minimal Techno
  Piano
  Pop
  Progressive House
  Punk
  R&B
  Rap
  Reggae
  Rock
  Singer-Songwriter
  Soul
  Tech House
  Techno
  Trance
  Trap
  Trip Hop
  World
  Audiobooks
  Business
  Comedy
  Entertainment
  Learning
  News & Politics
  Religion & Spirituality
  Science
  Sports
  Storytelling
  Technology".split("\n")
end
