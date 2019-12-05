class User < ApplicationRecord
	validates :name, presence: true
	validates :email, :presence => true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
	validates :password, presence: true
	
	has_many :primary_comments
	has_many :secondary_comments
end
