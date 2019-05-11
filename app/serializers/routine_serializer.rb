class RoutineSerializer < ActiveModel::Serializer
  attributes :id
  has_many :tasks
end
