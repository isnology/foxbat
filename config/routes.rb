Rails.application.routes.draw do

  root "init#index"
  post 'auth' => 'authentication#create'
  post 'auth/register' => 'registration#create'

  namespace :api, defaults: { format: :json } do
    #resource :instruments, only: [:index, :show, :create, :update]
    get 'instrument/:id' => 'instruments#show'
    get 'instruments' => 'instruments#index'
    put 'instruments/:id' => 'instruments#update'
    post 'instruments' => 'instruments#create'
    
    #resource :panels, only: [:index, :show, :create, :update, :delete]
    get 'panel/:id' => 'panels#show'
    get 'panels' => 'panels#index'
    put 'panels/:id' => 'panels#update'
    post 'panels' => 'panels#create'
    delete 'panels/:id' => 'panels#delete'
  end
  
  #devise_for :users
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
