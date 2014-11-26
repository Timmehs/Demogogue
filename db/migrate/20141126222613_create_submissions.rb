class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.integer :artist_id, null: false
      t.string :title, null: false
      t.text :track_info
      t.string :thumb_url
      t.string :audio_url

      t.timestamps
    end

    add_index :submissions, :artist_id
  end
end
