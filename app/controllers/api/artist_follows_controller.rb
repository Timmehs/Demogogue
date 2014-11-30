class Api::ArtistFollowsController < ApplicationController

  def create
    @af= current_user.artist_follows.new(artist_follow_params)
    if @af.save
      render json: @af
    else
      render json: @af.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @af = current_user.artist_follows.find(params[:id])
    @af.try(:destroy)
    render json: {}
  end

  def artist_follow_params
    params.require(:artist_follow).permit(:user_id, :artist_id)
  end
end
