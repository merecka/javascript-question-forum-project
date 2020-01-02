Rails.application.routes.draw do

  root to: 'sessions#new'
	
  resources :secondary_comments, only: [:new, :index, :create]
  resources :primary_comments, only:  [:new, :index, :create]
  resources :users, only: [:new, :index, :create, :destroy]

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
