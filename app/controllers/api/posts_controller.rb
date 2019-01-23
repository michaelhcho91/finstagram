class Api::PostsController < ApplicationController
  def index
    @posts = Posts.where()
    render :feed
  end
  
  def create
    @post = Post.new(post_params)

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
    params.require(:post).permit(:image_url, :caption)
  end
end