# == Schema Information
#
# Table name: panels
#
#  id         :bigint(8)        not null, primary key
#  template   :string
#  name       :string
#  slots      :jsonb
#  user_id    :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Panel < ApplicationRecord
  belongs_to :user
end
