json.array! @comments do |comment|
  json.extract! comment, :user_id, :demo_id, :body, :created_at
  json.username comment.user.username
  json.demo_title comment.demo.title
end
