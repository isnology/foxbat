# == Schema Information
#
# Table name: panels
#
#  id         :integer          not null, primary key
#  template   :string
#  name       :string
#  slots      :jsonb
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Panel < ApplicationRecord
  belongs_to :user
end
