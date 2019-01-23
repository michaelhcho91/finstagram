class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :image_url, null: false
      t.integer :poster_id, null: false, index: true
      t.text :caption
      
      t.timestamps
    end
  end
end
