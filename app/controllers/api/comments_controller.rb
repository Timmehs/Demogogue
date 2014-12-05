class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    @comment.save
    render json: @comment
  end

  def index

  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy() if comment
    render json: {}
  end

  def show
    @comment = Comment.includes(:replies).find(params[:id])
    render :show
  end

  def comment_params
    params.require(:comment).permit(
      :user_id, :demo_id, :comment_id, :body,
      :parent_comment_id
      )
  end

end
