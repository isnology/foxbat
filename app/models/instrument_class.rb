# == Schema Information
#
# Table name: instrument_classes
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class InstrumentClass < ApplicationRecord
  has_many :instruments
end
