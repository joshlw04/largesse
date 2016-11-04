class Api::V1::UsersController < ApplicationController
  def index
   users = User.all.includes(:clicks)
   render json: users, include: :clicks
  #  render :json => users.to_json(:include => :clicks)
 end

 def show
   @user = User.find_by firebase_uid: params[:id] # !!! :id becomes firebase_uid, NOT the primary key!
   puts params
   render json: @user, include: :clicks
 end

 def create
   user = User.new(user_params)
   if user.save
     render json: user, status: :created
   else
     render json: user.errors, status: :unprocessable_entity
   end
 end

 private

 def user_params
   params.require(:user).permit(:first_name, :last_name, :email, :total_clicks, :cost_per_click, :payment_type, :payment_last_four, :charity_id, :firebase_uid)
 end

end

# How to show both charities and clicks in the user json??
