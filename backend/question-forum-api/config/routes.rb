Rails.application.routes.draw do

  root to: 'application#index'
	
  resources :secondary_comments
  resources :primary_comments
  resources :users

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
