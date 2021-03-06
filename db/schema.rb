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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141213062732) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artist_follows", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "artist_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "artist_follows", ["artist_id"], name: "index_artist_follows_on_artist_id", using: :btree
  add_index "artist_follows", ["user_id", "artist_id"], name: "index_artist_follows_on_user_id_and_artist_id", unique: true, using: :btree
  add_index "artist_follows", ["user_id"], name: "index_artist_follows_on_user_id", using: :btree

  create_table "comments", force: true do |t|
    t.integer  "user_id",           null: false
    t.integer  "demo_id",           null: false
    t.string   "body",              null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "parent_comment_id"
  end

  add_index "comments", ["demo_id"], name: "index_comments_on_demo_id", using: :btree

  create_table "demos", force: true do |t|
    t.integer  "artist_id",  null: false
    t.string   "title",      null: false
    t.text     "track_info"
    t.string   "thumb_url"
    t.string   "audio_url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "genre"
  end

  add_index "demos", ["artist_id"], name: "index_demos_on_artist_id", using: :btree

  create_table "playlist_links", force: true do |t|
    t.integer  "playlist_id"
    t.integer  "demo_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "playlist_links", ["demo_id"], name: "index_playlist_links_on_demo_id", using: :btree
  add_index "playlist_links", ["playlist_id"], name: "index_playlist_links_on_playlist_id", using: :btree

  create_table "playlists", force: true do |t|
    t.string   "title"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "playlists", ["title", "user_id"], name: "index_playlists_on_title_and_user_id", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                                                 null: false
    t.string   "password_digest",                                       null: false
    t.string   "session_token",                                         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
    t.string   "avatar_url",      default: "assets/default_avatar.png"
  end

end
