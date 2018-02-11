# == Schema Information
#
# Table name: instruments
#
#  id                    :integer          not null, primary key
#  name                  :string
#  brand                 :string
#  model                 :string
#  part_no               :string
#  text                  :string
#  picture_url           :string
#  price                 :integer
#  size                  :string
#  horizontal_multiplier :integer
#  vertical_multiplier   :integer
#  size_multiplier       :integer
#  instrument_class_id   :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

class Instrument < ApplicationRecord
  belongs_to :instrument_class
end
