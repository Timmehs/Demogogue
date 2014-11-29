class Api::StreamController < ApplicationController
  def index
    render json: current_user.stream
  end
end
