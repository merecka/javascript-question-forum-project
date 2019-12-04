class SecondaryComment < ApplicationRecord
	belongs_to :user
	belongs_to :primary_comment
end
