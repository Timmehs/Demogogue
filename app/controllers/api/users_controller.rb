class Api::UsersController < ApplicationController

  def show
    @user = User.includes(:artists, :artist_follows, :demos, :stream_demos).find(params[:id])
    render :show
  end


  def edit
  end

  def destroy
  end


end
