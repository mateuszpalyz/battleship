class SeaController < ApplicationController
  def index
    @props = { firebase_config: firebase_config }
  end

  private

  def firebase_config
    {
      apiKey: Rails.application.secrets.firebase_api_key,
      authDomain: Rails.application.secrets.firebase_auth_domain,
      databaseURL: Rails.application.secrets.firebase_database_URL,
      projectId: Rails.application.secrets.firebase_project_id,
      storageBucket: Rails.application.secrets.firebase_storage_bucket,
      messagingSenderId: Rails.application.secrets.firebase_messaging_sender_id
    }
  end
end
