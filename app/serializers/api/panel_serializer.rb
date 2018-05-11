class Api::PanelSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :template, :slots, :user_id

end
