class AddUploadedFlagToInstrument < ActiveRecord::Migration[5.1]
  def change
    add_column :instruments, :uploaded, :boolean, default: false
  end
end
