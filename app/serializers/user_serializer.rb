#class UserSerializer < ActiveModel::Serializer
class UserSerializer < BaseSerializer
  #include FastJsonapi::ObjectSerializer
  
  #attributes :id, :email, :admin
  
  private
  
  def attributes
    %w(id email admin)
  end
end

