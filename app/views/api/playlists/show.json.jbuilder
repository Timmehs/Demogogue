

json.merge! @playlist.attributes

json.demos @playlist.demos do |demo|
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
