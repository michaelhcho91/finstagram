class RemovePostsColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :image_url
  end
end
