class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.new(follow_params)
    @follow.follower_id = current_user.id
    @follow.save
    render :show
  end

  def destroy
    @follow = Follow.where(follower_id: current_user.id).where(following_id: params[:id])[0]
    @follow.destroy
    render :show
  end

  private

  def follow_params
    params.require(:follow).permit(:follower_id, :following_id)
  end
end