class Word < ApplicationRecord
  validates :text, uniqueness: true, length: { minimum: 1, maximum: 30 }

  def as_json(*)
    {
      id: id,
      text: text,
    }
  end
end
