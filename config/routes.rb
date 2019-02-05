Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update]
    resource :session, only: [:create, :destroy]
    resources :posts, except: [:new, :edit]
    resources :comments, only: [:index, :create, :destroy]
    resources :follows, only: [:create, :destroy]
    resources :likes, only: [:index, :create, :destroy]
  end
end
