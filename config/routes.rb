Rails.application.routes.draw do

  root :to => 'artist#show'
  get 'tmp', to: 'artist#show_tmp'
  get '1', to: 'artist_1#show'
  get '2', to: 'artist_2#show'
  post 'send_email', :controller=>"mailing"
  post 'send_appointment_email', :controller=>"mailing"
end
