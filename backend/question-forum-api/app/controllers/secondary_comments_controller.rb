class SecondaryCommentsController < ApplicationController

	def index
  		secondary_comments = SecondaryComment.all
      	render json: secondary_comments
  	end
end
