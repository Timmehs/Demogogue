class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :demo_id, null: false
      t.string :body, null: false

      t.timestamps
    end

    add_index :comments, :demo_id
  end
end
