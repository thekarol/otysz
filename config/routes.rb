Rails.application.routes.draw do

  root :to => 'artist#show'
  get 'tmp', to: 'artist#show_tmp'

end
