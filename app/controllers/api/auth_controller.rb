class Api::AuthController < ApplicationController
  before_action :authenticate_user!
  
  def create
    render json: 'ok', status: :ok
  end
end
