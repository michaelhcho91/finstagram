class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    
    if @user.save
      login(@user)
      render :show
    else
      render json: ["Email, username, and password required."], status: 422
    end
  end   

  def show
    @user = User.find_by(params[:id])
  end

  def edit
    @user = User.find_by(params[:id])
  end

  def update
    @user = User.find_by(session_token: session[:session_token])

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end