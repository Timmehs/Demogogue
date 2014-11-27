class Api::DemosController < ApplicationController

  def index
    render json: Demo.all
  end

end
