class Api::V1::PanelSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :template, :slots, :user_id

end
