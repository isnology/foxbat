class Api::InstrumentsController < ApplicationController
  before_action :authenticate_request!, only: [:create, :update]
  
  def index
    render json: formats(Instrument.all), status: :ok
  end

  def create
    instrument = Instrument.new(instrument_params)
    if instrument.save
      render json: format(instrument), status: :created
    else
      render json: instrument.errors, status: :unprocessable_entity
    end
  end

  def update
    instrument = Instrument.find(params[:id])
    if instrument.update(instrument_params)
      render json: format(instrument), status: :ok
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
        :horizontal_multiplier,
        :vertical_multiplier,
        :size_multiplier,
        :instrument_class_id)
    end

    def format(data)
      {id: data.id, name: data.name, brand: data.brand, model: data.model, partNo: data.part_no, text: data.text,
       pictureUrl: data.picture_url, price: data.price, size: data.size,
       horizontalMultiplier: data.horizontal_multiplier, verticalMultiplier: data.vertical_multiplier,
       sizeMultiplier: data.size_multiplier,
       instrumentClass: {id: data.instrument_class.id, name: data.instrument_class.name}
      }
    end
end
