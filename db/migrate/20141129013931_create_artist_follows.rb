class CreateArtistFollows < ActiveRecord::Migration
  def change
    create_table :artist_follows do |t|
      t.integer :user_id, null: false
      t.integer :artist_id, null: false

      t.timestamps
    end

    add_index :artist_follows, :artist_id
    add_index :artist_follows, :user_id
  end
end
