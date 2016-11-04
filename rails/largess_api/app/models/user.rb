class User < ApplicationRecord
  has_many :clicks
  belongs_to :charity
end
