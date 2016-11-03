class Api::V1::CharitiesController < ApplicationController
  def index
   charities = Charity.all.includes(:users)
   render json: charities, include: :users
 end

 def create
   charity = Charity.new(charity_params)
   if charity.save
     render json: charity, status: :created
   else
     render json: charity.errors, status: :unprocessable_entity
   end
 end

 private

 def charity_params
   params.require(:charity).permit(:name, :address, :mission)
 end

end
