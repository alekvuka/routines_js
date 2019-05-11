class UsersController < ApplicationController


  def add_routine
    current_user.routines << Routine.find(params[:user_id])
    current_user.save
    redirect_to user_path(current_user)
  end

  def show
    @user = current_user
  end

  def routines
    @routines = Routine.order_my_routines(current_user)
    render 'routines/index'
  end

  def tasks
    @tasks = current_user.tasks.uniq
    render 'tasks/index'
  end

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.valid? != true
      flash[:messages] = @user.errors.full_messages
      render 'new'
    else
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    end
  end

  def edit
    @user = current_user
  end

  def update

    if !params[:user][:routine_to_delete].nil?
      current_user.routines.delete(Routine.find(params[:user][:routine_to_delete]))
      current_user.save
      redirect_to user_path(current_user)
    else
      current_user.update(user_params)
      if current_user.valid? != true
        flash[:messages] = current_user.errors.full_messages
        redirect_to edit_user_path(current_user)
      else
        current_user.routines.clear
        params[:user][:routine_ids].each do |routine|
          if !routine.empty?
            current_user.routines << Routine.find(routine)
          end
        end
        current_user.save
        redirect_to user_path(current_user)
      end
    end
  end

  def destroy
    if current_user = User.find(params[:id])
      current_user.destroy
      session.clear
      logout_path
    else
      redirect_to user_path(User.find(params[:id]))
    end
  end

  def user_params
    params.require(:user).permit(:name, :username, :email, :password, :password_confirmation)
  end

end
