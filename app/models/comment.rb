# == Schema Information
#
# Table name: comments
#
#  id                :integer          not null, primary key
#  user_id           :integer          not null
#  demo_id           :integer          not null
#  body              :string(255)      not null
#  created_at        :datetime
#  updated_at        :datetime
#  parent_comment_id :integer
#

class Comment < ActiveRecord::Base
  validates :user_id, :demo_id, :body, presence: true
  belongs_to :user
  belongs_to :demo
  belongs_to :parent_comment
  has_many(
    :replies,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )



end
