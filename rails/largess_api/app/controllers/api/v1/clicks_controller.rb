class Api::V1::ClicksController < ApplicationController
  def index
   clicks = Click.all
   render json: clicks
 end

 def create
   click = Click.new(click_params)
   if click.save
     render json: click, status: :create
   else
     render json: click.errors, status: :unprocessable_entity
   end
 end

 private

 def click_params
   params.require(:click).permit(:location)
 end

end
