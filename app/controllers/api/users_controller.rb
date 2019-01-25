class Api::UsersController < ApplicationController
  def index    
    @users = User.all.with_attached_photo
  end
  
  def create
    @user = User.new(user_params)
    
    if @user.save
      login(@user)
      render "api/posts/feed"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def edit
    @user = User.find_by(session_token: session[:session_token])
  end

  def update
    @user = User.find_by(session_token: session[:session_token])
    @user.photo = @user.photo || @user.attach(io: File.open)

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :name)
  end
end