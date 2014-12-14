
json.array! @playlists do |playlist|
  json.merge! playlist.attributes

  json.playlist_links playlist.playlist_links do |playlist_link|
    json.id playlist_link.id
    json.playlist_id playlist_link.playlist_id
    json.demo_id playlist_link.demo_id
  end

  # json.demos playlist.demos do |demo|
  #   json.id demo.id
  #   json.title demo.title
  #   json.artist_id demo.artist_id
  #   json.genre demo.genre
  #   json.artist_name demo.artist.username
  #   json.audio_url demo.audio_url
  #   json.created_at demo.created_at
  #   json.updated_at demo.updated_at
  #   json.thumb_url demo.thumb_url
  # end
end
