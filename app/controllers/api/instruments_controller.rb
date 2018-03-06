class Api::InstrumentsController < ApplicationController
  before_action :authenticate_request!, only: [:create, :update]
  
   
  def index
    @instruments = Instrument.all
  end

  def create
    @instrument = Instrument.new(instrument_params)
    if @instrument.save
      render 'show.json.jbuilder', status: :created, location: @instrument
    else
      render json: @instrument.errors, status: :unprocessable_entity
    end
  end

  def update
  
  end
  
  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def instrument_params
      params.require(:instrument).permit(
        :name,
        :brand,
        :model,
        :part_no,
        :text,
        :picture_url,
        :price,
        :size,
        :horizontal_multiplier,
        :vertical_multiplier,
        :size_multiplier,
        :instrument_class_id)
    end
  
end
