class SecondaryComment < ApplicationRecord
	belongs_to :users
	belongs_to :primary_comments
end
