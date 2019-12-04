Rails.application.routes.draw do

	 root to: 'application#index'
	
  resources :secondary_comments
  resources :primary_comments
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
