# An abstract base class used to create simple serializers
# for ActiveRecord objects for use with react.js
class BaseSerializer
  
  attr_reader :serialized_object, :as_hash
  
  def initialize(serialized_object, as_hash = nil)
    @serialized_object = serialized_object
    @as_hash = as_hash
  end
  
  def as_json(options={})
    if serialized_object.respond_to?(:to_ary)
      {serialized_object.class.to_s.split('::').first.pluralize.underscore =>
        if as_hash
          serialized_object.each_with_object({}) { |object, hsh| hsh[object.id] = serialize(object, options) }
        else
          serialized_object.map { |object| serialize(object, options) }
        end
      }
    else
      serialize(serialized_object, options.merge({root: true}))
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
      except:  without,
      include: includes,
      methods: methods }
  end
  
  # hook methods
  def attributes ; end
  def without    ; end
  def includes   ; end
  def methods    ; end
end
