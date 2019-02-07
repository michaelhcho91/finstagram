class Api::LikesController < ApplicationController  
  def create
    @like = Like.new(like_params)
    @like.liker_id = current_user.id
    @like.save
    render :show
  end

  def destroy
    @like = Like.where(liker_id: current_user.id).where(post_id: params[:id]).first
    @like.destroy
    render :show
  end

  private

  def like_params
    params.require(:like).permit(:liker_id, :post_id)
  end
end