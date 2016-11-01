class Api::V1::UsersController < ApplicationController
  def index
   users = User.all.includes(:charity)
   render json: users, include: :charity
 end

 def create
   user = User.new(user_params)
   if user.save
     render json: user, status: :create
   else
     render json: user.errors, status: :unprocessable_entity
   end
 end

 private

 def user_params
   params.require(:user).permit(:first_name, :last_name, :email, :total_clicks, :cost_per_click, :payment_type, :payment_last_four)
 end

end

# How to show both charities and clicks in the user json??
