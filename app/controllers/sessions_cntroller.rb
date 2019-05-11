class SessionsController < ApplicationController
  def create
    user = User.find_by(username: params[:session][:username])
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      redirect_to user_path(current_user)
    else
      flash[:alert] = "Email or password is invalid"
      redirect_to users_path
    end
  end

  def create_with_google
    user = User.find_by(email: auth[:info][:email], name: auth[:info][:name])
    if user
      user.uid = auth[:uid]
      user.save
      session[:user_id] = user.id
      redirect_to user_path(current_user)
    else
      flash[:alert] = "Google authentication failed"
      render 'static/index'
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
