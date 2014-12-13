class Api::PlaylistLinksController < ApplicationController

  def create
    playlist = current_user.playlists.find(params[:playlist_id])
    @playlist_link = playlist.playlist_links.create(playlist_link_params)
    render json: @playlist_link
  end

  def destroy
    playlist = current_user.playlists.find(params[:playlist_id])
    @playlist_link = playlist.playlist_links.find(params[:id])
    @playlist_link.try(:destroy)
    render json: {}
  end

  def playlist_link_params
    params.require(:playlist_link).permit(:playlist_id, :demo_id)
  end
end
