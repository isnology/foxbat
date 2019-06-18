#class Api::V1::PanelSerializer < ActiveModel::Serializer
class Api::V1::PanelSerializer < BaseSerializer
  
  #attributes :id, :name, :template, :slots, :user_id
  
  private
  
  # def attributes
  #   %w(id name template slots user_id)
  # end

  def without
    %w(created_at updated_at)
  end
end
