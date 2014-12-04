# json.extract!(@demo, :id, :artist_id, :created_at, :updated_at, :title)
#


json.merge! @demo.attributes
json.artist_name @demo.artist.username
json.artist @demo.artist, :id, :username, :avatar_url
json.comments @demo.comments.each do |comment|
  next if comment.parent_comment_id
  json.merge! comment.attributes
  json.user_avatar comment.user.avatar_url
  json.author comment.user.username
  json.replies comment.replies.each do |reply|
    json.merge! reply.attributes
    json.user_avatar reply.user.avatar_url
    json.author reply.user.username
  end

end
