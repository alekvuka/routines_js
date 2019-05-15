class SessionsController < ApplicationController
  def create
    user = User.find_by(username: params[:session][:username])
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      redirect_to user_path(current_user)
    else
      flash[:alert] = "Email or password is invalid"
      redirect_to root_path
    end
  end

  def destroy
    session.clear
    redirect_to root_path
  end

  def auth
    request.env['omniauth.auth']
  end


end
