class ChangeDefaultUserAvatar < ActiveRecord::Migration
  def change
    change_column_default :users, :avatar_url, "assets/default_avatar.png"
  end
end
