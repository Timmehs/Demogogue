class Api::PlaylistsController < ApplicationController


  def create
    playlist = current_user.playlists.create({title: params[:title]})
    render json: playlist
  end

  def show
    @playlist = Playlist.find(params[:id])
    render :show
  end

  def destroy
    playlist = Playlist.find(params[:id])
    playlist.destroy() if playlist
    render json: {}
  end

  private

  def playlist_params
    params.require(:playlist).permit(:user_id, :title);
  end

end
