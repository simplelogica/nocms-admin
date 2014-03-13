Rails.application.routes.draw do

  mount NoCms::Admin::Engine => "/admin"
  resources :lorem_ipsum

end
