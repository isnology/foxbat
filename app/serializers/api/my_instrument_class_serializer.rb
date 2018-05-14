module Api
  module MyInstrumentClassSerializer
  
    def serialize_instrument_class(data)
      if data.respond_to?(:map)
        {instrument_classes: serialize_instrument_class_many(data)}
      else
        {instrument_class: serialize_instrument_class_one(data)}
      end
    end
    
    def serialize_instrument_class_one(data)
      {
        id: data.id,
        name: data.name
      }
    end
    
    def serialize_instrument_class_many(data)
      data.map do |dta|
        serialize_instrument_class_one(dta)
      end
    end
  end
end