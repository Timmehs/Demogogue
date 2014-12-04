# json.extract!(@demo, :id, :artist_id, :created_at, :updated_at, :title)
#


json.merge! @demo.attributes
json.artist_name @demo.artist.username
json.artist @demo.artist, :id, :username, :avatar_url
json.comments @demo.comments.each do |comment|
  json.merge! comment.attributes
  json.user_avatar comment.user.avatar_url
end
