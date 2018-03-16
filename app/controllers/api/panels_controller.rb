class Api::PanelsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_panel, only: [:show, :update, :destroy]
  
  def index
    render json: formats(Panel.all), status: :ok
  end
  
  def show
    render json: format(@panel), status: :ok
  end

  def create
    panel = Panel.new(panel_params)
    panel.user = current_user
    
    if panel.save
      render json: format(panel), status: :created
    else
      render json: panel.errors, status: :unprocessable_entity
    end
  end

  def update
    if @panel.update(panel_params)
      render json: format(@panel), status: :ok
    else
      render json: panel.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @panel.destroy
    render json: format(@panel), status: :ok
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

    def set_panel
      @panel = Panel.find(params[:id])
    end
  
    def format(data)
      {id: data.id, name: data.name, template: data.template, slots: data.slots, userId: data.user_id}
    end
end
