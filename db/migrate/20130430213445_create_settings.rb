class CreateSettings < ActiveRecord::Migration
	def change
		create_table :settings do |t|
			t.datetime :season_start
			t.datetime :schedule_400_advising
			t.datetime :schedule_all_advising
			t.datetime :schedule_400minor_advising
			t.datetime :season_end
			t.integer :appointment_length
			t.timestamps
		end
	end
end
