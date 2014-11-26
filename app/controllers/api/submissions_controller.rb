class Api::SubmissionsController < ApplicationController

  def index
    render json: Submission.all
  end

end
