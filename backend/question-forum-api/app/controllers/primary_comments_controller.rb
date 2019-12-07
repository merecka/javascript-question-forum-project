class PrimaryCommentsController < ApplicationController

	  def index
  		primary_comments = PrimaryComment.all
      options = {
        include: [:user]
      }
      render json: PrimaryCommentSerializer.new(primary_comments, options)
  	end

  	def show
      	@primary_comments = PrimaryComment.all
  	end

  	def new
  		@primary_comment = PrimaryComment.new
  	end

  	def create
    	@primary_comment = PrimaryComment.create(primary_comment_params)
    	if @primary_comment
    		# Redirects to the Primary Comment's show page
    		redirect_to primary_comment_path(@primary_comment)
    	else
    	render :new
    	end
  	end

  	def edit

  	end

  	def update
  		# @room.update(name: room_params[:name], occupancy: room_params[:occupancy], cost: room_params[:cost])
  		# redirect_to room_path(@room)
  	end

  	def destroy
  		# Room.find_by(id: params[:id]).destroy
  		# redirect_to rooms_path
  	end

 	private

 	def primary_comments_params
    	params.require(:primary_comment).permit(:user_id, :comment)
  	end
end
