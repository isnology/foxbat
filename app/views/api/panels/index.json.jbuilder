json.key_format! camelize: :lower
json.array! @panels do |panel|
  json.(panel, :id, :template, :name, :price, :slots, :user_id)
end
