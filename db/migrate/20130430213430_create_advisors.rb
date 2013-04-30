class CreateAdvisors < ActiveRecord::Migration
	def change
		create_table :advisors do |t|
			t.integer :uid
			t.string :name
			t.timestamps
		end

		create_table :timetables do |t|
			t.datetime :appointment_time
			t.integer :student_id
			t.integer :advisor_id
		end
	end
end
