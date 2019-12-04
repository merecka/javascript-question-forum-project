class PrimaryComment < ApplicationRecord
	belongs_to :user
	has_many :secondary_comments 
end
