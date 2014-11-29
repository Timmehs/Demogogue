Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :session, only: [:create, :destroy]
  resources :users, only: [:create]

  namespace :api, defaults: {format: :json } do
    resources :demos, except: [:new, :edit]
    resources :users, only: [:show, :edit, :destroy] do
      resources :stream, only: [:index]
    end
  end
end
