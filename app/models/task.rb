class Task < ApplicationRecord

  validates :name, presence: true, uniqueness: true

  has_many :task_routines
  has_many :routines, through: :task_routines

  def all_users
    users = Array.new
    self.routines.each do |routine|
      routine.users.each do |user|
        users << user
      end
    end
    users.uniq
  end


end
