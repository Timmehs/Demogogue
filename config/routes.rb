Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :sessions, only: [:new, :create, :destroy]
end
