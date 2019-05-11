class UserRoutines < ActiveRecord::Migration[5.2]
  def change
    create_table :user_routines do |t|

      t.integer :user_id
      t.integer :routine_id

      t.string :priority

      t.timestamps
    end
  end
end
