class Api::PostsController < ApplicationController
  def index
    @posts = Post.all.with_attached_photo
    render :feed
  end
  
  def create
    @post = Post.new(post_params)
    @post.poster_id = current_user.id

    if @post.save
      render :feed
    else
      render json: ["Upload an image."], status: 422
    end
  end
  
  def edit
    @post = Post.find_by(params[:id])
  end

  def update
    @post = Post.find_by(params[:id])
    
    if @post.update(post_params)
      render :feed
    else
      render json: @post.errors.full_messages
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    render :feed
  end

  private

  def post_params
    params.require(:post).permit(:caption)
  end
end