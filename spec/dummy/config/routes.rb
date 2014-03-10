Rails.application.routes.draw do

  mount NoCms::Admin::Engine => "/admin"
end
