class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_credentials(params[:session]);
    if @user
      sign_in!(@user)
      puts "LOGGED IN! #{current_user.email}"
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username or password"];
      render :new
    end
  end

  def destroy
    log_out!(current_user) if current_user
    redirect_to root_url
  end
end
