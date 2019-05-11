class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :routine 
end
