Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :charities, only: [:create, :index]
      resources :users, only: [:create, :index, :show, :update]
      resources :clicks, only: [:create, :index, :show]
    end
  end
end
