#class Api::V1::InstrumentClassSerializer < ActiveModel::Serializer
class Api::V1::InstrumentClassSerializer < BaseSerializer
  
  #attributes :id, :name
  
  private
  
  # def attributes
  #   %w(id name)
  # end

  def without
    %w(created_at updated_at)
  end

end
