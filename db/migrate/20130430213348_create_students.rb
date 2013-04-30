class CreateStudents < ActiveRecord::Migration
	def change
		create_table :students do |t|
			t.integer :uid
			t.string :tag
			t.string :name
			t.timestamps
		end
	end
end
