class SessionsController < ApplicationController

  def new
    #No code needed here, just a placeholder for the 'Get' action
  end

  def create
    #Sets the session via a manual User login
      user = User.find_by(id: params[:user][:id])
      if user
        user.authenticate(params[:password])
        session[:current_user_id] = user.id
        redirect_to user_path(user)
      else
        redirect_to '/login'
      end
    end
  end

  def destroy
    session.clear
    @logged_in_user = nil
    redirect_to '/'
  end

end