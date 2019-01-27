class Api::CommentsController < ApplicationController
  def index
    @comments = Post.where(post_id: params[:id])
  end
  
  def create
    @comment = Comment.new(comment_params)
    @comment.commenter_id = current_user.id

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    comment = Comment.find_by(params[:id])
    comment.destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :commenter_id, :post_id)
  end
end