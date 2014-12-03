json.array! @demos do |demo|
  json.extract!(demo, :id, :artist_id, :created_at, :audio_url,
                      :genre, :updated_at, :thumb_url, :title)
  json.artist_name demo.artist.username
end
