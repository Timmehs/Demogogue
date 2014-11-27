json.extract!(@demo, :id, :artist_id, :created_at, :updated_at, :title)

json.artist @demo.artist, :id, :username
