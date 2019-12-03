class PrimaryComment < ApplicationRecord
	belongs_to :users
	has_many :secondary_comments 
end
