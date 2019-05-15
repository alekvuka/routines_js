class TasksController < ApplicationController

  def all_tasks
    @tasks = Task.all
    render json: @tasks
  end

end
