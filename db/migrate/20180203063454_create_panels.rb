class CreatePanels < ActiveRecord::Migration[5.1]
  def change
    create_table :panels do |t|
      t.string :template
      t.string :name
      t.jsonb :slots
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :panels, [:user_id, :name], unique: true
  end
end
