Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :session, only: [:create, :destroy]
  resources :users, only: [:create]

  namespace :api, defaults: {format: :json } do
    resources :artist_follows, only: [:create, :destroy]
    resources :demos, except: [:edit, :update, :destroy]
    resources :comments, only: [:create, :destroy, :show]
    resources :users, only: [:show, :edit, :destroy]
    resources :playlists, only: [:show, :create, :destroy]
    resources :stream, only: [:index]
  end
end
