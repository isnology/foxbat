class Api::V1::InstrumentClassesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update]
  
  def index
    render json: InstrumentClass.all, status: :ok
  end
  
  def create
    instrument_class = InstrumentClass.new(instrument_class_params)
    if instrument_class.save
      render json: instrument_class, status: :created
    else
      render json: instrument_class.errors, status: :unprocessable_entity
    end
  end
  
  def update
    instrument_class = InstrumentClass.find(params[:id])
    if instrument_class.update(instrument_class_params)
      render json: instrument_class, status: :ok
    else
      render json: instrument_class.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  # Never trust parameters from the scary internet, only allow the white list through.
  def instrument_class_params
    params.require(:instrument_class).permit(:name)
  end
end
