class Api::PanelsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :delete]
  
  def index
    @panels = Panel.all
  end
  
  def show
    @panel = Panel.find(params[:id])
  end

  def create
    panel = Panel.new(panel_params)
    panel.user = current_user
    
    if panel.save
      render json: format(panel), status: :created
      #render 'show.json.jbuilder', status: :created, location: @panel
    else
      render json: panel.errors, status: :unprocessable_entity
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
      :user_id,
      slots: [:L01, :L02, :L03, :L04, :L05, :L06, :M01, :M02, :M03, :S01, :S02, :S03, :D01, :R01, :R02])
    end
  
    def format(panel)
      {id: panel.id, name: panel.name, template: panel.template, slots: panel.slots, user_id: panel.user_id}
    end
end
