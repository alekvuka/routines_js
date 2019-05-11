class User < ApplicationRecord
  has_many :user_routines
  has_many :routines, through: :user_routines
  has_many :tasks, through: :routines

  has_secure_password

  validates_confirmation_of :password
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6,  allow_nil: true }


  def number_of_routines
   self.routines.count
  end

  def number_of_tasks
   self.tasks.count
  end

  def current_routine
   routines = Array.new
   self.routines.each do |routine|
     if routine.begin_hour <= routine.current_hour && routine.end_hour >= routine.current_hour
       routines << routine
     end
   end
   routines
  end

  def upcoming_routine
   self.routines.map do |routine|
     if routine.end_hour >= routine.current_hour && !self.current_routine.include?(routine)
       return routine
     end
    end
  end

end
