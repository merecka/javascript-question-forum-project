class SecondaryCommentsController < ApplicationController

	def index
  		secondary_comments = SecondaryComment.all
  		options = {
        # include: [:primary_comment]
        include: [:user, :primary_comment]
      	}
     	render json: SecondaryCommentSerializer.new(secondary_comments, options)
  	end

  	def create
  		secondary_comment = SecondaryComment.create(user_id: params[:user_id], primary_comment_id: params[:primary_comment_id], comment: params[:comment])
    	if secondary_comment
    		# Redirects to the Primary Comment's show page
        secondary_comments = SecondaryComment.all
        options = {
        include: [:user]
        }
        render json: SecondaryCommentSerializer.new(secondary_comments, options)
    	end
  	end
end
