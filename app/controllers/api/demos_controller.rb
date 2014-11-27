class Api::DemosController < ApplicationController

  def index
    render json: Demos.all
  end

end
