Rails.application.routes.draw do
  
  get '/', to: redirect('/index')
  
  devise_for :users, path_prefix: 'api', defaults: { format: :json }
  
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :instruments, only: [:index, :show, :create, :update]
      resources :instrument_classes, only: [:index, :show, :create, :update]
      
      resources :panels, only: [:index, :show, :create, :update, :destroy]
      
      resources :admin, only: [:create, :update, :destroy]#
    end
  end
  
  get '*path', to: redirect('/index')
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
