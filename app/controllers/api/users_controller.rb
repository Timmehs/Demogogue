class Api::UsersController < ApplicationController

  def show
    if params[:id] == current_user.id
      @user = User.includes(
            :artists, :artist_follows, :demos, :stream_demos).find(params[:id])
    else
      @user = User.includes(:demos).find(params[:id])
    end
    render :show
  end


  def edit
  end

  def destroy
  end


end
