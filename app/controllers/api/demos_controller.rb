class Api::DemosController < ApplicationController

  def index
    @demos = Demo.includes(:artist).all
    render :index
  end

  def show
    @demo = Demo.includes(:artist, :comments).find(params[:id])
    render :show
  end

  def update
    @demo = Demo.find(demo_params[:id])
    if @demo.update_attributes(demo_params)
      render :show
    else
      flash.now[:errors] = @demo.errors.full_messages
    end
  end

  def create
    @demo = Demo.new(demo_params);
    @demo.save
    render json: @demo
  end


  def demo_params
    params.require(:demo).permit(:id, :title, :artist_id, :thumb_url, :audio_url, :track_info,
      :created_at, :updated_at)
  end

end
