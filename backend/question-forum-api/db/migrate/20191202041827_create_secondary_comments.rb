class CreateSecondaryComments < ActiveRecord::Migration[5.2]
  def change
    create_table :secondary_comments do |t|
      t.integer :primary_comment_id
      t.integer :user_id
      t.text :comment

      t.timestamps
    end
  end
end
