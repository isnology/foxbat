class CreateInstruments < ActiveRecord::Migration[5.1]
  def change
    create_table :instruments do |t|
      t.string :name
      t.string :brand
      t.string :model
      t.string :part_no
      t.string :text
      t.string :picture_url
      t.integer :price
      t.string :size
      t.integer :horizontal_multiplier
      t.integer :vertical_multiplier
      t.integer :size_multiplier
      t.references :instrument_class, foreign_key: true

      t.timestamps
    end
  end
end
