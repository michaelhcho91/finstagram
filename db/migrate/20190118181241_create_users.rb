class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false, unique: true, index: true
      t.string :password_digest, null: false, unique: true
      t.string :session_token, null: false, unique: true, index: true
      t.string :name
      t.string :email, null: false, unique: true, index: true
      t.text :image_url
      t.text :bio
      
      t.timestamps
    end
  end
end
