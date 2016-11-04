class Api::V1::ClicksController < ApplicationController
  def index
   clicks = Click.all
   render json: clicks
 end

 def show
   @click = Click.find_by user_id: params[:id] # !!! :id becomes user_id, NOT the primary key!
   puts params
   render json: @user
 end

 def create
   click = Click.new(click_params)
   if click.save
     render json: click, status: :created
   else
     render json: click.errors, status: :unprocessable_entity
   end
 end

 private

 def click_params
   params.require(:click).permit(:user_id, :location)
 end

end
