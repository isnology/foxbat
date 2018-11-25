class Api::AuthController < ApplicationController
  def create
    render json: 'ok', status: :ok
  end
end
