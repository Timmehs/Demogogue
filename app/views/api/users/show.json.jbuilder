json.extract!(@user, :id, :created_at, :updated_at, :username, :avatar_url)

json.demos @user.demos do |demo|
  json.id demo.id
  json.title demo.title
  json.artist_id demo.artist_id
  json.artist_name demo.artist.username
  json.thumb_url demo.thumb_url
end

json.stream_demos @user.stream_demos do |demo|
  json.id demo.id
  json.title demo.title
  json.artist_id demo.artist_id
  json.artist_name demo.artist.username
  json.thumb_url demo.thumb_url
end

json.artists @user.artists do |artist|
  json.id artist.id
  json.username artist.username
end

json.artist_follows @user.artist_follows do |artist_follow|
  json.id artist_follow.id
  json.artist_id artist_follow.artist_id
  json.artist_name artist_follow.artist.username
end
