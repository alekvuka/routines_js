class CreateRoutines < ActiveRecord::Migration[5.2]
  def change
    create_table :routines do |t|

      t.string :name
      t.string :start_time
      t.string :end_time

      t.integer :originator_id

      t.timestamps
    end
  end
end
