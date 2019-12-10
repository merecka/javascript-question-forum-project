class SessionsController < ApplicationController

  def new
    # if current_user
    #   #If already logged in, redirect to questions index page.
    #   redirect_to '/'
    # else
      # render file: "/Users/alexmerecka/Software-Programming/FlatIron-Labs/javascript-project-question-forum/frontend/login.html", layout: false
      # render inline: File.read('/Users/alexmerecka/Software-Programming/FlatIron-Labs/javascript-project-question-forum/frontend/login.html')
    # end
  end

  def create
    if current_user
    #Login or creates a User from Facebook login via Omniauth
    redirect_to '/'

    else
    #Sets the session via a manual User login
      user = User.find_by(name: params[:name])
      if user && user.password == params[:password]
        session[:current_user_id] = user.id
        render json: user
      else
        redirect_to '/login'
      end
    end
  end

  def destroy
    session.clear
    @_current_user = nil
    redirect_to '/'
  end

end