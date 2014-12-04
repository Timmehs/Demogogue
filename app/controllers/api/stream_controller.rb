class Api::StreamController < ApplicationController

  def index
    @demos = current_user.stream_demos
    render :index
  end
end
