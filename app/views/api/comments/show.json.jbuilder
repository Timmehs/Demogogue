json.merge! @comment.attributes
json.user_avatar @comment.user.avatar_url
json.auther @comment.user.username

json.replies @comment.replies.each do |reply|
  json.merge! reply.attributes
  json.user_avatar reply.user.avatar_url
  json.auther reply.user.username
end
