class ApplicationController < ActionController::API

	def current_user
  		@logged_in_user ||= session[:current_user_id] &&
      	User.find_by(id: session[:current_user_id])
  	end
end
