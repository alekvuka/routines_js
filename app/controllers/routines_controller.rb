class RoutinesController < ApplicationController

  def destroy_routine
    Routine.find(params[:id]).delete
    render json: {status: 200}.to_json
  end

  def create
    convert_time_input_to_24hour
    params[:user]
    @routine = Routine.create(routine_params)
    @routine.originator_id = params[:user]
    @routine.users << User.find_by_id(params[:user])
    add_existing_tasks
    if params[:routine][:tasks] != nil
     @routine.add_new_tasks(params[:routine][:tasks])
    end
    @routine.save
    render json: @routine
  end


  def show
    @routine = Routine.find(params[:id])
    render json: @routine
  end


  #def destroy
  #  if current_user == User.find(params[:user_id]) && Routine.find_by_id(params[:id]).originator_id ==  current_user.id
  #    Routine.find(params[:id]).delete
  #    redirect_to user_path(current_user)
  #  else
  #    redirect_to logout_path
  #  end
  #end

  def routine_params
    params.require(:routine).permit(:name, :start_time, :end_time, :originator_id, :task_ids)
  end

  private

  def add_existing_tasks

    if  params[:routine][:task_ids] != nil
      if !params[:routine][:task_ids].reject(&:empty?).empty?
          params[:routine][:task_ids].reject(&:empty?).each do |task_id|
            @routine.tasks << Task.find_by_id(task_id)
          end
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
