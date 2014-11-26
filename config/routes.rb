Rails.application.routes.draw do
  root to: "static_pages#root"
  resource :session, only: [:create, :destroy]
  resource :users, only: [:create]
end
