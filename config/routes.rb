Rails.application.routes.draw do
  
  devise_for :users, path_prefix: 'api', defaults: { format: :json }
  
  namespace :api, defaults: { format: :json } do
    post 'auth', to: 'auth#create'
    namespace :v1 do
      resources :instruments, only: [:index, :show, :create, :update]
      resources :instrument_classes, only: [:index, :show, :create, :update]
      resources :panels, only: [:index, :show, :create, :update, :destroy]
      resources :admin, only: [:create, :update, :destroy]
      post 'submitpanel', to: 'submitpanel#create'
    end
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
