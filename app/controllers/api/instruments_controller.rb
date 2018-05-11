class Api::InstrumentsController < ApplicationController
  before_action :authenticate_request!, only: [:create, :update]
  
  def index
    #render json: format_many(Instrument.includes(:instrument_class).all),
    #       status: :ok
    #render json: Api::InstrumentSerializer.new(Instrument.includes(:instrument_class).all).serialized_json,
    #       status: :ok
    instruments = Instrument.includes(:instrument_class).all
    render json: instruments, status: :ok
  end

  def create
    instrument = Instrument.includes(:instrument_class).new(instrument_params)
    if instrument.save
      #render json: format(instrument), status: :created
      render json: instrument, status: :created
    else
      render json: instrument.errors, status: :unprocessable_entity
    end
  end

  def update
    instrument = Instrument.includes(:instrument_class).find(params[:id])
    if instrument.update(instrument_params)
      #render json: format(instrument), status: :ok
      render json: instrument, status: :ok
    else
      render json: instrument.errors, status: :unprocessable_entity
    end
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
        :picture_h_offset,
        :picture_v_offset,
        :picture_width,
        :picture_height,
        :instrument_class_id)
    end
end
