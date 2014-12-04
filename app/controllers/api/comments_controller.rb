class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    @comment.save
    render json: @comment
  end

  def comment_params
    params.require(:comment).permit(
      :user_id, :demo_id, :comment_id, :body,
      :parent_comment_id
      );
  end

end
