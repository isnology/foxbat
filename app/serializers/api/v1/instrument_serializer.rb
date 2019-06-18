#class Api::V1::InstrumentSerializer < ActiveModel::Serializer
class Api::V1::InstrumentSerializer < BaseSerializer
  
  # attributes :id, :name, :brand, :model, :part_no, :text, :price, :size, :picture_url, :uploaded,
  #            :picture_width, :picture_height, :picture_h_offset, :picture_v_offset
  #
  # attribute :instrument_class do |object|
  #   {id: object.instrument_class.id, name: object.instrument_class.name}
  # end
  
  #belongs_to :instrument_class
  
  private
  
  # def attributes
  #   %w(id name brand model part_no text price size picture_url uploaded picture_width picture_height picture_h_offset
  #     picture_v_offset instrument_class_id)
  # end
  
  def without
    %w(created_at updated_at)
  end
  
  # def includes
  #   { instrument_class: { only: %w(id name) } }
  # end
  
  # def methods     # from the model
  #   %w(mytest)
  # end
end

