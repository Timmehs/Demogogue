class Api::DemosController < ApplicationController

  def index
    render json: Demo.all
  end

  def show
    @demo = Demo.includes(:artist).find(params[:id])
    render :show
  end

  def update
    @demo = Demo.find(demo_params[:id])
    if @demo.update_attributes(demo_params)
      puts "yeah boy SAVE SUCCESSFUL"
    end
    render :show
  end


  def demo_params
    params.require(:demo).permit(:id, :title, :artist_id, :thumb_url, :audio_url, :track_info,
      :created_at, :updated_at)
  end

end
