class CreateInstruments < ActiveRecord::Migration[5.1]
  def change
    create_table :instruments do |t|
      t.string :name
      t.string :brand
      t.string :model
      t.string :part_no
      t.string :text
      t.integer :price
      t.string :size
      t.string :picture_url
      t.decimal :picture_width, precision: 5, scale: 2
      t.decimal :picture_height, precision: 5, scale: 2
      t.decimal :picture_h_offset, precision: 5, scale: 2
      t.decimal :picture_v_offset, precision: 5, scale: 2
      t.references :instrument_class, foreign_key: true

      t.timestamps
    end
    add_index :instruments, [:brand, :model, :part_no], unique: true
  end
end
