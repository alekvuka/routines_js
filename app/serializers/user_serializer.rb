class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :routines
end
