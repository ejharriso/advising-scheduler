# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130430213445) do

  create_table "advisors", :force => true do |t|
    t.integer  "uid"
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "settings", :force => true do |t|
    t.datetime "season_start"
    t.datetime "schedule_400_advising"
    t.datetime "schedule_all_advising"
    t.datetime "schedule_400minor_advising"
    t.datetime "season_end"
    t.integer  "appointment_length"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  create_table "students", :force => true do |t|
    t.integer  "uid"
    t.string   "tag"
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "superusers", :force => true do |t|
    t.integer  "uid"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "timetables", :force => true do |t|
    t.datetime "appointment_time"
    t.integer  "student_id"
    t.integer  "advisor_id"
  end

end
