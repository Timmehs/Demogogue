# == Schema Information
#
# Table name: artist_follows
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  artist_id  :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class ArtistFollow < ActiveRecord::Base
  belongs_to :user
  belongs_to(
    :artist,
    class_name: "User",
    foreign_key: :artist_id,
    primary_key: :id
  )
  

end
