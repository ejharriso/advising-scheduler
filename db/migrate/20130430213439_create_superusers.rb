class CreateSuperusers < ActiveRecord::Migration
	def change
		create_table :superusers do |t|
			t.integer :uid
			t.timestamps
		end
	end
end
