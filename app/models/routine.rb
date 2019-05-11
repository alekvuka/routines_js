class Routine < ApplicationRecord
  has_many :user_routines
  has_many :task_routines

  has_many :tasks, through: :task_routines
  has_many :users, through: :user_routines

  scope :order_by_start_time, -> { self.order(:start_time) }
  scope :order_my_routines, -> (user) { user.routines.order(:start_time)}


  def add_new_tasks(tasks)
    tasks.each do |key, value|
     if !value.empty?
       task = Task.find_or_create_by(name: value)
       self.tasks << task
       task.save
      end
     end
  end

  def self.convert_to_24(hour)
    if hour != nil
      DateTime.parse(hour).strftime("%H:%M").strip
    end
  end

  def self.convert_from_24(hour)
    if hour != nil
      DateTime.parse(hour).strftime("%l:%M%P").strip
    end
  end

  def current_hour
    Time.now.hour.to_i
  end

  def begin_hour
    DateTime.parse(self.start_time).strftime("%H").to_i
  end

  def end_hour
    routine_end_hour = DateTime.parse(self.end_time).strftime("%H").to_i
    if routine_end_hour < self.begin_hour
      routine_end_hour = routine_end_hour + 24
    end
    routine_end_hour
  end

end
