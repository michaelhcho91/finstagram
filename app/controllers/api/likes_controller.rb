class Api::LikesController < ApplicationController
  def index
    @likes = Like.all
    render :index
  end
  
  def create
    @like = Like.new(like_params)
    @like.liker_id = current_user.id
    @like.save
    render :show
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
    render :show
  end

  private

  def like_params
    params.require(:like).permit(:liker_id, :post_id)
  end
end