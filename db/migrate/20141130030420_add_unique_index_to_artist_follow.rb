class AddUniqueIndexToArtistFollow < ActiveRecord::Migration
  def change
    add_index(:artist_follows, [:user_id, :artist_id], unique: true)
  end
end
