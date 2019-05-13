class TasksController < ApplicationController

  def all_tasks
    @tasks = Task.all
    render json: @tasks
  end


   def index
     @tasks = Task.all
     render 'index'
   end

   def show
     @task = Task.find(params[:id])
   end

end
