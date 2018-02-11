class Api::PanelsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :delete]
  
  def index
    @panels = Panel.all
  end
  
  def show
    @panel = Panel.find(params[:id])
  end

  def create
    @panel = Panel.new(panel_params)
    @Panel.user = current_user
    
    if @panel.save
      render 'show.json.jbuilder', status: :created, location: @panel
    else
      render json: @panel.errors, status: :unprocessable_entity
    end
  end

  def update
  end

  def delete
  end
  
  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def panel_params
      params.require(:panel).permit(
      :template,
      :name,
      :slots,
      :user_id)
    end
end
