class TasksController < ApplicationController

   def index
     @tasks = Task.all
     render 'index'
   end

   def show
     @task = Task.find(params[:id])
   end

end
