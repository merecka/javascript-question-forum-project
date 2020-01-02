class UsersController < ApplicationController
  
  def index
  	users = User.all
    render json: UserSerializer.new(users)
  end

  def new
    @user = User.new
  end

  def create
    user = User.create(user_params)
    if user.valid?
    	# Sets the User session and redirects to the User's show page
    	session[:current_user_id] = user.id
    	render json: user, status: 200
    else
    	render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

end