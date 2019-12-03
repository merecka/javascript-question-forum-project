class CreatePrimaryComments < ActiveRecord::Migration[5.2]
  def change
    create_table :primary_comments do |t|
      t.integer :user_id
      t.text :comment

      t.timestamps
    end
  end
end
