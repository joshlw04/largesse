Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :charities, only: [:create, :index]
      resources :users, only: [:create, :index]
      resources :clicks, only: [:create, :index]
    end
  end
end
