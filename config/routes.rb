Rails.application.routes.draw do
  root to: 'sea#index'
  mount ActionCable.server => '/cable'
end
