# == Schema Information
#
# Table name: instruments
#
#  id                  :bigint(8)        not null, primary key
#  name                :string
#  brand               :string
#  model               :string
#  part_no             :string
#  text                :string
#  price               :integer
#  size                :string
#  picture_url         :string
#  picture_width       :decimal(5, 2)
#  picture_height      :decimal(5, 2)
#  picture_h_offset    :decimal(5, 2)
#  picture_v_offset    :decimal(5, 2)
#  instrument_class_id :bigint(8)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class Instrument < ApplicationRecord
  belongs_to :instrument_class

  #mount_uploader :picture_url, S3Uploader
end
