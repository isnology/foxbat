class RegistrationController < ApplicationController
  
  def create
    user = User.create(email: params[:email], password: params[:password],
        password_confirmation: params[:password_confirmation])
    if user.save
      render json: payload(user)
    else
      render json: {errors: ['Invalid Username/Password']}, status: :unauthorized
    end
  end

  private

    def payload(user)
      return nil unless (user && user.id)
      {
        auth_token: JsonWebToken.encode({email: user.email}),
        user: {id: user.id, email: user.email}
      }
    end
end
