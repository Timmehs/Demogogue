json.extract!(@user, :id, :created_at, :updated_at, :username, :avatar_url)

json.demos @user.demos do |demo|
  json.id demo.id
  json.title demo.title
  json.artist_id demo.artist_id
  json.artist_name demo.artist.username
  json.thumb_url demo.thumb_url
end

json.playlists @user.playlists do |playlist|
  json.merge! playlist.attributes

  json.playlist_links playlist.playlist_links do |playlist_link|
    json.id playlist_link.id
    json.playlist_id playlist_link.playlist_id
    json.demo_id playlist_link.demo_id
  end

  json.demos playlist.demos do |demo|
    json.id demo.id
    json.title demo.title
    json.artist_id demo.artist_id
    json.genre demo.genre
    json.artist_name demo.artist.username
    json.audio_url demo.audio_url
    json.created_at demo.created_at
    json.updated_at demo.updated_at
    json.thumb_url demo.thumb_url
  end
end

json.stream_demos @user.stream_demos do |demo|
  json.id demo.id
  json.title demo.title
  json.artist_id demo.artist_id
  json.genre demo.genre
  json.artist_name demo.artist.username
  json.audio_url demo.audio_url
  json.created_at demo.created_at
  json.updated_at demo.updated_at
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
