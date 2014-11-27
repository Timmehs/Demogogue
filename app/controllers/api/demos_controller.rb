class Api::DemosController < ApplicationController

  def index
    render json: Demo.all
  end

  def show
    @demo = Demo.includes(:artist).find(params[:id])
    render :show
  end

end
