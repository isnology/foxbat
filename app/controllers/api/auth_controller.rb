class Api::AuthController < ApplicationController
  before_action :authenticate_user!
  
  def create
    render json: {user: current_user.id, email: current_user.email}, status: :ok
  end
end
