class TaskRoutine < ActiveRecord::Base

  belongs_to :routine
  belongs_to :task

end
