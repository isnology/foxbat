# An abstract base class used to create simple serializers
# for ActiveRecord objects
class BaseSerializer
  include Rails.application.routes.url_helpers
  
  attr_reader :serialized_object
  
  def initialize(serialized_object)
    @serialized_object = serialized_object
  end
  
  def as_json(options={})
    if serialized_object.respond_to?(:to_ary)
      #serialized_object.map { |object| serialize(object, options) }
      serialized_object.each_with_object({}) { |object, hsh| hsh[object.id] = serialize(object, options) }
    else
      serialize(serialized_object, options)
    end
  end
  
  private
  
  # serialize a single instance
  def serialize(object, options={})
    object.as_json(as_json_options.merge(options))
  end
  
  # the default options passed to as_json
  def as_json_options
    { only:    attributes,
      include: includes,
      methods: methods }
  end
  
  # hook methods
  def attributes ; end
  def includes   ; end
  def methods    ; end
end
