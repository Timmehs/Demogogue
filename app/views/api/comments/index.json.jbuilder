json.array! @comments do |comment|
  json.extract! comment, :user_id, :demo_id, :body
  json.user_avatar comment.user.avatar_url
end
