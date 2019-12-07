class SecondaryCommentsController < ApplicationController

	def index
  		secondary_comments = SecondaryComment.all
  		options = {
        include: [:user, :primary_comment]
      	}
     	render json: SecondaryCommentSerializer.new(secondary_comments, options)
  	end
end
