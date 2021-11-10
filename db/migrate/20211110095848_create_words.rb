class CreateWords < ActiveRecord::Migration[6.1]
  def change
    create_table :words do |t|
      t.string :text, null: false, limit: 30, index: { unique: true }

      t.timestamps
    end
  end
end
