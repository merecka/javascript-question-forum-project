class SecondaryCommentsController < ApplicationController

	def index
  		secondary_comments = SecondaryComment.all
  		options = {
        include: [:user, :primary_comment]
      	}
     	render json: SecondaryCommentSerializer.new(secondary_comments, options), status: 200
  	end

	def create
		secondary_comment = SecondaryComment.create(secondary_comments_params)
  	if secondary_comment
      secondary_comments = SecondaryComment.all
      options = {
      include: [:user]
      }
      render json: SecondaryCommentSerializer.new(secondary_comments, options), status: 200
  	end
	end

  private

  def secondary_comments_params
      params.require(:secondary_comment).permit(:user_id, :primary_comment_id, :comment)
  end
end
