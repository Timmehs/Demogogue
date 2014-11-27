class ChangeSubmissionsToDemos < ActiveRecord::Migration
  def change
    rename_table :submissions, :demos
  end
end
