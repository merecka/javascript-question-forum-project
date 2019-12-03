class User < ApplicationRecord
	validates :name, presence: true
	validates :email, :presence => true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
	
	has_many: primary_comments
	has_secure_password
end
