class RoutinesController < ApplicationController

  def index
  end

  def new
    @user = User.find(params[:user_id])
    @routine = Routine.new
  end

  def create
    convert_time_input_to_24hour
    @routine = Routine.create(routine_params)
    @routine.originator_id = current_user.id
    @routine.users << current_user
    set_priority
    add_existing_tasks
    @routine.add_new_tasks(params[:task])
    @routine.save

    redirect_to user_path(current_user)
  end

  def edit
    @routine = Routine.find(params[:id])
  end

  def update
    convert_time_input_to_24hour
    @routine = Routine.find(params[:id])
    @routine.update(routine_params)
    set_priority
    @routine.tasks.clear
    add_existing_tasks
    @routine.add_new_tasks(params[:task])
    @routine.save

    redirect_to user_path(current_user)
  end

  def show
    @routine = Routine.find(params[:id])
  end

  def destroy
    if current_user == User.find(params[:user_id]) && Routine.find_by_id(params[:id]).originator_id ==  current_user.id
      Routine.find(params[:id]).delete
      redirect_to user_path(current_user)
    else
      redirect_to logout_path
    end
  end

  def routine_params
    params.require(:routine).permit(:name, :start_time, :end_time, :originator_id, :task_ids)
  end

  private

  def add_existing_tasks
    if !params[:routine][:task_ids].reject(&:empty?).empty?
        params[:routine][:task_ids].reject(&:empty?).each do |task_id|
          @routine.tasks << Task.find_by_id(task_id)
        end
    end
  end

  def set_priority
    user_routine = UserRoutine.find_by(user: current_user, routine: @routine)
    user_routine.priority = params[:priority]
    user_routine.save
  end

  def convert_time_input_to_24hour
    params[:routine][:start_time] = Routine.convert_to_24(params[:routine][:start_time])
    params[:routine][:end_time] = Routine.convert_to_24(params[:routine][:end_time])
  end


end
