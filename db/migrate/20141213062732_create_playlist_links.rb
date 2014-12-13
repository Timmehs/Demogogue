class CreatePlaylistLinks < ActiveRecord::Migration
  def change
    create_table :playlist_links do |t|
      t.integer :playlist_id
      t.integer :demo_id

      t.timestamps
    end

    add_index :playlist_links, :playlist_id
    add_index :playlist_links, :demo_id
  end
end
