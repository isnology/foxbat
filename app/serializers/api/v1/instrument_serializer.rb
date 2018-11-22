class Api::V1::InstrumentSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :brand, :model, :part_no, :text, :price, :size, :picture_url, :uploaded,
             :picture_width, :picture_height, :picture_h_offset, :picture_v_offset
  
  has_one :instrument_class
end
