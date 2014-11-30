class ArtistFollowsController < ApplicationController

  def create
    current_user.artist_follows.create({artist_id: params[:id] })
    if af.save
      render json: af
    else
      flash.now[:errors] = af.errors.full_messages
    end
  end

  def destroy
    af = ArtistFollows.new(artist_follow_params)


end
