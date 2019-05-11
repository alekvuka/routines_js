Rails.application.routes.draw do
  root to: "static#index"

  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  get '/auth/google_oauth2/callback' => 'sessions#create_with_google'

  get '/get_user/:id', to: 'users#get_user'
  get '/get_current_routines/:id', to: 'users#current_routines'

  resources :tasks, only: [:index, :show]
  resources :routines, only: [:index, :show]

  resources :users do
    get '/routines', to: 'users#routines'
    get '/tasks', to: 'users#tasks'
    get '/add', to: 'users#add_routine'
    resources :routines, only: [:new, :edit, :update, :create, :destroy]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
