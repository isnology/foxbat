module Api
  module MyInstrumentSerializer
    include Api::MyInstrumentClassSerializer
    
    def serialize_instrument(data)
      if data.respond_to?(:map)
        {instruments: serialize_instrument_many(data)}
      else
        {instrument: serialize_instrument_one(data)}
      end
    end
    
    def serialize_instrument_one(data)
      {
        id: data.id,
        name: data.name,
        brand: data.brand,
        model: data.model,
        part_no: data.part_no,
        text: data.text,
        price: data.price,
        size: data.size,
        picture_url: data.picture_url,
        picture_width: data.picture_width,
        picture_height: data.picture_height,
        picture_h_offset: data.picture_h_offset,
        picture_v_offset: data.picture_v_offset
      }
    end
    
    def serialize_instrument_many(data)
      data.map do |dta|
          serialize_instrument_one(dta).merge(serialize_instrument_class(dta.instrument_class))
      end
    end
  end
end