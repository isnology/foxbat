class Api::V1::PanelsController < ApplicationController
  before_action :authenticate_user!, only: [:index, :create, :update, :destroy]
  before_action :set_panel, only: [:show, :update, :destroy]
  
  def index
    render json: serializer(Panel.where(user_id: current_user.id)), status: :ok
  end
  
  def show
    render json: @panel, status: :ok
  end
  
  def create
    panel = Panel.new(panel_params)
    panel.user = current_user
    
    if panel.save
      render json: serializer(panel), status: :created
    else
      render json: panel.errors, status: :unprocessable_entity
    end
  end
  
  def update
    if params[:user_id] == current_user.id || current_user.admin
      if @panel.update(panel_params)
        render json: serializer(@panel), status: :ok
      else
        render json: @panel.errors, status: :unprocessable_entity
      end
    else
      render json: {error: "User not authorised to this data"}, status: :unprocessable_entity
    end
  end
  
  def destroy
    if params[:user_id] == current_user.id || current_user.admin
      @panel.destroy
      render json: serializer(@panel), status: :ok
    else
      render json: {error: "User not authorised to this data"}, status: :unprocessable_entity
    end
  end
  
  private

  def serializer(object)
    Api::V1::PanelSerializer.new(object).as_json
  end
  
  # Never trust parameters from the scary internet, only allow the white list through.
  def panel_params
    params.require(:panel).permit(
      :template,
      :name,
      :user_id,
      slots: [:L01, :L02, :L03, :L04, :L05, :L06, :M01, :M02, :M03, :S01, :S02, :S03, :D01, :R01, :R02])
  end
  
  def set_panel
    @panel = Panel.find(params[:id])
  end

end
