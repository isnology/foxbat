json.key_format! camelize: :lower
json.extract! @instrument do |instrument|
  json.(instrument, :id, :name, :brand, :model, :part_no, :text, :picture_url, :price, :size, :horizontal_multiplier,
      :vertical_multiplier, :size_multiplier)
  json.instrumentClass do
    json.(instrument.instrument_class, :id, :name)
  end
end