class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.integer :total_clicks
      t.integer :cost_per_click
      t.string :payment_type
      t.integer :payment_last_four
      t.belongs_to :charity, foreign_key: true

      t.timestamps
    end
  end
end
