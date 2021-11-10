Rails.application.routes.draw do
  root to: 'homes#show'

  namespace :api do
    resources :words, only: %i[index create destroy]
  end
end
