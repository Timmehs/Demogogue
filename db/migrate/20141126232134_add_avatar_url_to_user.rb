class AddAvatarUrlToUser < ActiveRecord::Migration
  def up
    add_column :users, :avatar_url, :string, default: "default_avatar.png"
  end

  def down
    remove_column :users, :avatar_url
  end
end
