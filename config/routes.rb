Rails.application.routes.draw do
  root to: "static#index"

  resources :users

  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

  get '/get_user/:id', to: 'users#get_user'
  get '/get_current_routines/:id', to: 'users#current_routines'
  get '/get_upcoming_routines/:id', to: 'users#upcoming_routines'
  get '/get_routines/:id', to: 'users#get_routines'
  get '/all_tasks', to: 'tasks#all_tasks'

  post '/routine', to: 'routines#create'
  get '/delete_routine/:id', to: 'routines#destroy_routine'

end
