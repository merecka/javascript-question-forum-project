class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :email

  	has_many :primary_comments
	has_many :secondary_comments
end