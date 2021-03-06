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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_14_073850) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "instrument_classes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "instruments", force: :cascade do |t|
    t.string "name"
    t.string "brand"
    t.string "model"
    t.string "part_no"
    t.string "text"
    t.integer "price"
    t.string "size"
    t.string "picture_url"
    t.decimal "picture_width", precision: 5, scale: 2
    t.decimal "picture_height", precision: 5, scale: 2
    t.decimal "picture_h_offset", precision: 5, scale: 2
    t.decimal "picture_v_offset", precision: 5, scale: 2
    t.bigint "instrument_class_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "uploaded", default: false
    t.index ["brand", "model", "part_no"], name: "index_instruments_on_brand_and_model_and_part_no", unique: true
    t.index ["instrument_class_id"], name: "index_instruments_on_instrument_class_id"
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["exp"], name: "index_jwt_blacklist_on_exp"
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "panels", force: :cascade do |t|
    t.string "template"
    t.string "name"
    t.jsonb "slots"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "name"], name: "index_panels_on_user_id_and_name", unique: true
    t.index ["user_id"], name: "index_panels_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "instruments", "instrument_classes"
  add_foreign_key "panels", "users"
end
