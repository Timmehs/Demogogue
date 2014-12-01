class AddAwsKeyToDemos < ActiveRecord::Migration
  def change
    add_column :demos, :aws_key, :string
    add_column :demos, :genre, :string 
  end
end
