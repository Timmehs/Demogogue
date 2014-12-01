class RemoveAwsKeyFromDemos < ActiveRecord::Migration
  def change
    remove_column :demos, :aws_key
  end
end
